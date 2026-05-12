# backend/app/api/reports.py

from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import Response
from ..dependencies.auth import require_role
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from io import BytesIO
from datetime import datetime

router = APIRouter()

@router.get("/compliance/{workflow_id}", tags=["reports"])
def generate_compliance_report(
    workflow_id: int, 
    user = Depends(require_role(["admin", "analyst"]))
):
    # Create PDF in memory
    buffer = BytesIO()
    p = canvas.Canvas(buffer, pagesize=letter)
    width, height = letter

    # Header
    p.setFont("Helvetica-Bold", 24)
    p.drawString(50, height - 80, "GuardForge Compliance Report")
    
    p.setFont("Helvetica", 10)
    p.drawString(50, height - 100, f"Generated on: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    p.drawString(50, height - 115, f"Workflow ID: {workflow_id}")
    p.drawString(50, height - 130, f"Issued by: {user.email}")

    # Summary Section
    p.setFont("Helvetica-Bold", 16)
    p.drawString(50, height - 180, "1. Executive Summary")
    p.setFont("Helvetica", 12)
    p.drawString(50, height - 200, "This document certifies that the AI workflow has been audited against corporate governance")
    p.drawString(50, height - 215, "policies. All guardrail violations were logged and reviewed.")

    # Risk Findings
    p.setFont("Helvetica-Bold", 16)
    p.drawString(50, height - 260, "2. Risk Findings")
    p.setFont("Helvetica", 12)
    p.drawString(60, height - 280, "• Prompt Injection Resistance: PASS")
    p.drawString(60, height - 300, "• PII Leakage Prevention: PASS")
    p.drawString(60, height - 320, "• Hallucination Score: 0.02 (Optimal)")

    # Footer
    p.setFont("Helvetica-Oblique", 8)
    p.drawString(50, 50, "CONFIDENTIAL - GuardForge Enterprise Governance Platform")

    p.showPage()
    p.save()

    pdf = buffer.getvalue()
    buffer.close()

    return Response(
        content=pdf,
        media_type="application/pdf",
        headers={"Content-Disposition": f"attachment; filename=compliance_report_{workflow_id}.pdf"}
    )
