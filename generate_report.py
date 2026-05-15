#!/usr/bin/env python3
"""GuardForge Enterprise AI Governance Platform - Professional Report Generator"""

from fpdf import FPDF
import textwrap

class GuardForgeReport(FPDF):
    def __init__(self):
        super().__init__(orientation='P', unit='mm', format='A4')
        self.set_auto_page_break(auto=True, margin=25)
        self._chapter_count = 0

    def header(self):
        if self.page_no() == 1:
            return
        self.set_font('Helvetica', 'I', 8)
        self.set_text_color(100, 100, 100)
        self.cell(0, 8, 'GuardForge Enterprise AI Governance Platform - Professional Report', align='C')
        self.ln(5)
        self.set_draw_color(0, 102, 204)
        self.set_line_width(0.5)
        self.line(10, self.get_y(), 200, self.get_y())
        self.ln(5)

    def footer(self):
        if self.page_no() == 1:
            return
        self.set_y(-20)
        self.set_font('Helvetica', 'I', 8)
        self.set_text_color(128, 128, 128)
        self.cell(0, 10, f'Page {self.page_no() - 1}', align='C')

    def cover_page(self):
        self.add_page()
        self.ln(40)
        # Title block
        self.set_fill_color(0, 102, 204)
        self.rect(0, 60, 210, 3, 'F')
        self.ln(30)
        self.set_font('Helvetica', 'B', 32)
        self.set_text_color(20, 20, 40)
        self.cell(0, 15, 'GuardForge', align='C', new_x='LMARGIN', new_y='NEXT')
        self.set_font('Helvetica', '', 18)
        self.set_text_color(60, 60, 80)
        self.cell(0, 12, 'Enterprise AI Governance Platform', align='C', new_x='LMARGIN', new_y='NEXT')
        self.ln(5)
        self.set_font('Helvetica', 'B', 16)
        self.set_text_color(0, 102, 204)
        self.cell(0, 10, 'Comprehensive Technical & Governance Report', align='C', new_x='LMARGIN', new_y='NEXT')
        self.ln(8)
        self.set_fill_color(0, 102, 204)
        self.rect(0, self.get_y(), 210, 3, 'F')
        self.ln(20)
        # Details
        self.set_font('Helvetica', '', 11)
        self.set_text_color(60, 60, 60)
        details = [
            'Document Type: Technical Architecture & Governance Analysis',
            'Version: 1.0',
            'Classification: Internal - Confidential',
            'Date: May 15, 2026',
            'Prepared By: Antigravity AI - Governance Division',
        ]
        for d in details:
            self.cell(0, 8, d, align='C', new_x='LMARGIN', new_y='NEXT')
        self.ln(20)
        self.set_font('Helvetica', 'I', 10)
        self.set_text_color(100, 100, 100)
        self.cell(0, 8, 'This report provides a comprehensive analysis of the GuardForge platform,', align='C', new_x='LMARGIN', new_y='NEXT')
        self.cell(0, 8, 'covering technical architecture, governance capabilities,', align='C', new_x='LMARGIN', new_y='NEXT')
        self.cell(0, 8, 'security implementation, and enterprise readiness.', align='C', new_x='LMARGIN', new_y='NEXT')

    def section_title(self, num, title):
        self.ln(4)
        self.set_font('Helvetica', 'B', 18)
        self.set_text_color(0, 51, 102)
        self.cell(0, 10, f'{num}. {title}', new_x='LMARGIN', new_y='NEXT')
        self.set_draw_color(0, 102, 204)
        self.set_line_width(0.8)
        self.line(10, self.get_y(), 200, self.get_y())
        self.ln(4)

    def sub_section(self, title):
        self.ln(2)
        self.set_font('Helvetica', 'B', 13)
        self.set_text_color(0, 76, 153)
        self.cell(0, 8, title, new_x='LMARGIN', new_y='NEXT')
        self.ln(1)

    def sub_sub_section(self, title):
        self.ln(1)
        self.set_font('Helvetica', 'B', 11)
        self.set_text_color(51, 51, 51)
        self.cell(0, 7, title, new_x='LMARGIN', new_y='NEXT')
        self.ln(1)

    def body_text(self, text):
        self.set_font('Helvetica', '', 10)
        self.set_text_color(40, 40, 40)
        self.multi_cell(0, 5.5, text)
        self.ln(1)

    def bullet_list(self, items):
        self.set_font('Helvetica', '', 10)
        self.set_text_color(40, 40, 40)
        for item in items:
            x = self.get_x()
            self.cell(5, 5.5, '')
            self.set_font('Helvetica', 'B', 10)
            self.cell(4, 5.5, '-')
            self.set_font('Helvetica', '', 10)
            self.multi_cell(0, 5.5, f'  {item}')
            self.ln(0.5)

    def key_value_block(self, items):
        self.set_font('Helvetica', '', 10)
        self.set_text_color(40, 40, 40)
        for key, val in items:
            x = self.get_x()
            self.cell(5, 5.5, '')
            self.set_font('Helvetica', 'B', 10)
            self.cell(40, 5.5, key + ':')
            self.set_font('Helvetica', '', 10)
            self.multi_cell(0, 5.5, val)
            self.ln(0.5)

    def note_box(self, text):
        self.ln(2)
        self.set_fill_color(230, 242, 255)
        self.set_draw_color(0, 102, 204)
        self.set_line_width(0.3)
        x = self.get_x()
        y = self.get_y()
        self.rect(10, y, 190, 16, 'DF')
        self.set_xy(14, y + 2)
        self.set_font('Helvetica', 'I', 9)
        self.set_text_color(0, 51, 102)
        self.multi_cell(182, 5, text)
        self.ln(4)

    def table_header(self, headers):
        self.set_font('Helvetica', 'B', 9)
        self.set_fill_color(0, 51, 102)
        self.set_text_color(255, 255, 255)
        w = 190 / len(headers)
        for h in headers:
            self.cell(w, 8, h, border=1, fill=True, align='C')
        self.ln()

    def table_row(self, cells, fill=False):
        self.set_font('Helvetica', '', 8.5)
        self.set_text_color(40, 40, 40)
        if fill:
            self.set_fill_color(240, 245, 255)
        else:
            self.set_fill_color(255, 255, 255)
        w = 190 / len(cells)
        for c in cells:
            self.cell(w, 7, c, border=1, fill=True, align='C')
        self.ln()


def build_report():
    pdf = GuardForgeReport()

    # ======================================================================
    # COVER PAGE
    # ======================================================================
    pdf.cover_page()

    # ======================================================================
    # TABLE OF CONTENTS
    # ======================================================================
    pdf.add_page()
    pdf.set_font('Helvetica', 'B', 20)
    pdf.set_text_color(0, 51, 102)
    pdf.cell(0, 12, 'Table of Contents', new_x='LMARGIN', new_y='NEXT')
    pdf.set_draw_color(0, 102, 204)
    pdf.set_line_width(0.8)
    pdf.line(10, pdf.get_y(), 200, pdf.get_y())
    pdf.ln(8)

    toc_items = [
        ('1', 'Executive Summary', 3),
        ('2', 'Project Overview & Business Context', 4),
        ('3', 'System Architecture & Design Philosophy', 5),
        ('4', 'Frontend Technical Analysis', 6),
        ('5', 'Backend Technical Analysis', 7),
        ('6', 'Database Schema & Data Architecture', 8),
        ('7', 'Authentication, Authorization & Security', 9),
        ('8', 'Core Features - In-Depth Analysis', 10),
        ('9', 'Governance, Compliance & Regulatory Alignment', 13),
        ('10', 'Deployment Architecture & Infrastructure', 14),
        ('11', 'Enterprise Readiness Assessment', 15),
        ('12', 'Strategic Recommendations & Roadmap', 16),
        ('13', 'Conclusion', 17),
    ]
    for num, title, pg in toc_items:
        pdf.set_font('Helvetica', 'B', 11)
        pdf.set_text_color(0, 51, 102)
        pdf.cell(10, 7, num + '.')
        pdf.set_font('Helvetica', '', 11)
        pdf.set_text_color(40, 40, 40)
        dots = '.' * (70 - len(title))
        pdf.cell(160, 7, f'{title} {dots}', new_x='END')
        pdf.set_font('Helvetica', '', 11)
        pdf.cell(10, 7, str(pg), align='R', new_x='LMARGIN', new_y='NEXT')

    # ======================================================================
    # 1. EXECUTIVE SUMMARY
    # ======================================================================
    pdf.add_page()
    pdf.section_title('1', 'Executive Summary')
    pdf.body_text(
        'GuardForge is a comprehensive, enterprise-grade full-stack application purpose-built for AI governance, '
        'safety monitoring, and operational observability. In an era where artificial intelligence systems are becoming '
        'increasingly autonomous and embedded in critical business processes, the need for robust governance frameworks '
        'has never been more urgent. GuardForge addresses this imperative by providing organizations with a centralized, '
        'real-time dashboard for managing AI agents, enforcing security and compliance policies, and tracking execution '
        'traces with surgical precision.'
    )
    pdf.body_text(
        'This report presents a thorough technical and strategic analysis of the GuardForge platform. It covers the '
        'end-to-end architecture spanning a React 18-based frontend with premium dark-mode aesthetics, a FastAPI '
        'Python 3.14+ backend engineered for performance, and a SQLite database layer managed through SQLAlchemy ORM. '
        'The platform integrates JWT-based authentication with role-based access control (RBAC), real-time WebSocket '
        'communication for live trace streaming, and automated PDF report generation for compliance documentation.'
    )
    pdf.body_text(
        'From a governance perspective, GuardForge delivers seven core capabilities: a Live Dashboard for high-level '
        'metrics, a Trace Explorer for step-by-step audit of agent decisions, an AI Policy Generator that extracts '
        'governance rules from uploaded documents, an Agent Management module for health and performance tracking, '
        'a searchable Audit Log for compliance trails, a Safety Scanner for red-teaming AI vulnerabilities, and '
        'comprehensive User Management with role-based access.'
    )
    pdf.body_text(
        'The platform supports three distinct user roles - Admin, Analyst, and Viewer - each with carefully scoped '
        'permissions that align with enterprise governance best practices. The current deployment runs with a React '
        'frontend on port 5173 and FastAPI backend on port 8000, backed by a local SQLite database. This report '
        'evaluates the platform across technical, security, governance, and operational dimensions, providing '
        'actionable recommendations for production hardening and strategic evolution.'
    )

    # ======================================================================
    # 2. PROJECT OVERVIEW
    # ======================================================================
    pdf.add_page()
    pdf.section_title('2', 'Project Overview & Business Context')
    pdf.sub_section('2.1 Background and Motivation')
    pdf.body_text(
        'The proliferation of AI agents in enterprise environments has introduced unprecedented challenges in governance, '
        'safety, and compliance. Organizations deploying AI systems face mounting regulatory pressure from frameworks '
        'such as the EU AI Act, NIST AI Risk Management Framework, and evolving data protection regulations. Traditional '
        'governance tools are ill-equipped to handle the dynamic, autonomous nature of modern AI agents, creating a '
        'critical gap in the enterprise technology stack.'
    )
    pdf.body_text(
        'GuardForge was conceived to fill this gap. It provides a unified platform that brings together AI agent '
        'management, policy enforcement, real-time observability, and compliance reporting into a single, coherent '
        'system. The platform is designed to serve as the central nervous system for enterprise AI operations, '
        'enabling organizations to deploy AI agents with confidence, knowing that every action is monitored, '
        'every decision is auditable, and every policy violation is flagged and recorded.'
    )

    pdf.sub_section('2.2 Platform Vision')
    pdf.body_text(
        'The vision for GuardForge is to become the definitive enterprise platform for AI governance. This encompasses '
        'several key objectives: providing real-time visibility into AI agent behavior across the organization; '
        'enabling automated policy enforcement that adapts to changing regulatory requirements; creating a comprehensive '
        'audit trail that satisfies compliance obligations; empowering security teams to proactively probe AI '
        'vulnerabilities through red-teaming capabilities; and delivering actionable insights through intuitive '
        'dashboards and reporting tools.'
    )

    pdf.sub_section('2.3 Target Audience')
    pdf.body_text(
        'GuardForge is designed for a diverse set of enterprise stakeholders. Compliance officers and legal teams '
        'benefit from the audit logging, policy generation, and compliance reporting features. AI/ML engineers and '
        'data scientists use the agent management and trace explorer tools to monitor and debug AI agent behavior. '
        'Security operations teams leverage the safety scanner and red-teaming capabilities. Executive leadership '
        'relies on the dashboard for high-level visibility into AI risk posture and operational metrics.'
    )

    # ======================================================================
    # 3. SYSTEM ARCHITECTURE
    # ======================================================================
    pdf.add_page()
    pdf.section_title('3', 'System Architecture & Design Philosophy')
    pdf.sub_section('3.1 Architectural Overview')
    pdf.body_text(
        'GuardForge follows a modern two-tier web application architecture with a clear separation between the '
        'presentation layer (React frontend) and the API layer (FastAPI backend). This decoupled architecture '
        'provides several advantages: independent scalability of frontend and backend components, technology '
        'flexibility that allows each layer to evolve independently, clear API contracts that facilitate development '
        'and testing, and the ability to support multiple client types (web, mobile, API consumers) from a single '
        'backend service.'
    )

    pdf.sub_section('3.2 Architectural Diagram Description')
    pdf.body_text(
        'The system architecture is organized into three primary layers. The Presentation Layer consists of the '
        'React 18 Single Page Application (SPA) served by Vite, implementing glassmorphism UI design patterns '
        'with Lucide-React icons and Context API for state management. The Application Layer is the FastAPI '
        'backend running on uvicorn ASGI server, handling HTTP REST endpoints and WebSocket connections, '
        'implementing JWT authentication middleware, and using SQLAlchemy for object-relational mapping. '
        'The Data Layer uses SQLite for local development with SQLAlchemy ORM models defining User, Agent, '
        'Policy, Workflow, and AuditLog entities.'
    )

    pdf.sub_section('3.3 Data Flow Patterns')
    pdf.body_text(
        'GuardForge implements several data flow patterns to support its diverse feature set. For real-time '
        'observability, WebSocket connections stream execution traces from the backend to the Trace Explorer '
        'component, enabling live monitoring of agent decision-making. For policy management, documents are '
        'uploaded to the backend where PyPDF2 extracts text content, which is then processed through the '
        'policy generation pipeline. For compliance reporting, the backend uses reportlab to dynamically '
        'generate PDF documents with governance data queried from the database. All system events flow through '
        'a centralized audit logging pipeline that captures actions, policy violations, and system events with '
        'timestamps and user attribution.'
    )

    pdf.note_box(
        'Note: The current deployment uses SQLite which is suitable for development and single-server deployments. '
        'For production enterprise use, migration to PostgreSQL or another production-grade database is recommended '
        'for concurrent access, connection pooling, and advanced querying capabilities.'
    )

    # ======================================================================
    # 4. FRONTEND TECHNICAL ANALYSIS
    # ======================================================================
    pdf.add_page()
    pdf.section_title('4', 'Frontend Technical Analysis')
    pdf.sub_section('4.1 Technology Stack Rationale')
    pdf.key_value_block([
        ('Framework', 'React 18+ with Vite - chosen for its component-based architecture, virtual DOM '
                       'performance, and extensive ecosystem. Vite provides rapid hot module replacement and '
                       'optimized production builds.'),
        ('Styling', 'Vanilla CSS with Glassmorphism aesthetics - a design trend that uses frosted glass-like '
                    'effects with backdrop blur, transparency, and vibrant gradients, projecting a premium, '
                    'modern appearance suitable for enterprise security tools.'),
        ('Icons', 'Lucide-React - an open-source icon library providing consistent, high-quality SVG icons '
                  'with tree-shaking support for minimal bundle size.'),
        ('State Management', 'Context API - React\'s built-in state management solution, used for '
                             'authentication state and session management without external dependencies.'),
        ('Routing', 'React Router v6 with v7 future flags enabled - providing declarative routing with '
                    'loader/action patterns for data fetching and mutation.'),
    ])

    pdf.sub_section('4.2 User Interface Architecture')
    pdf.body_text(
        'The frontend is structured around a dashboard-centric layout that serves as the primary navigation hub. '
        'Key UI components include the Live Dashboard presenting high-level metrics through data visualization '
        'components showing total agents, active workflows, risk scores, and execution trends; the Trace Explorer '
        'with a real-time, step-by-step execution viewer connected via WebSocket; the AI Policy Generator '
        'interface with document upload and policy review workflows; the Agent Management grid displaying '
        'agent health, latency, faithfulness scores, and operational status; the Audit Log with search '
        'capabilities; and the Safety Scanner with red-teaming controls and results visualization.'
    )

    pdf.sub_section('4.3 User Experience Design')
    pdf.body_text(
        'The UX design emphasizes clarity, accessibility, and professional aesthetics. The dark-mode default '
        'reduces eye strain for security operators who monitor dashboards for extended periods. Glassmorphism '
        'effects create visual hierarchy through varying levels of transparency and backdrop blur, while vibrant '
        'gradient accents on interactive elements provide intuitive affordance. Responsive design principles '
        'ensure usability across desktop monitors and tablet devices commonly used in security operations centers.'
    )

    pdf.sub_section('4.4 Performance Optimization')
    pdf.body_text(
        'Vite\'s build pipeline provides automatic code splitting, CSS minification, and tree shaking. '
        'The React component architecture enables lazy loading of route-level components, reducing initial '
        'bundle size. WebSocket connections maintain persistent communication channels, eliminating the overhead '
        'of repeated HTTP polling for real-time data. The Context API for authentication state avoids prop '
        'drilling and unnecessary re-renders through context memoization patterns.'
    )

    # ======================================================================
    # 5. BACKEND TECHNICAL ANALYSIS
    # ======================================================================
    pdf.add_page()
    pdf.section_title('5', 'Backend Technical Analysis')
    pdf.sub_section('5.1 Framework Selection: FastAPI')
    pdf.body_text(
        'FastAPI was selected as the backend framework for several compelling reasons. It provides automatic '
        'OpenAPI/Swagger documentation generation, which is invaluable for API development and client integration. '
        'It offers native support for asynchronous request handling, WebSocket connections, and background tasks - '
        'all critical for GuardForge\'s real-time monitoring and document processing features. FastAPI\'s Pydantic '
        'integration provides robust request validation and serialization, while its performance characteristics '
        'rival those of Node.js and Go-based frameworks, achieving throughput of up to 10,000 requests per second '
        'under optimal conditions.'
    )

    pdf.sub_section('5.2 ASGI Server: Uvicorn')
    pdf.body_text(
        'Uvicorn serves as the ASGI server implementation, providing the low-level HTTP and WebSocket handling '
        'for the FastAPI application. It leverages uvloop and httptools for high-performance event loop management, '
        'enabling the backend to handle thousands of concurrent connections with minimal resource consumption. '
        'Uvicorn\'s worker management capabilities allow for horizontal scaling through multiple process workers, '
        'though the current development configuration uses a single worker for simplicity.'
    )

    pdf.sub_section('5.3 Key Libraries and Integrations')
    pdf.body_text(
        'The backend integrates several specialized libraries to support its feature set. PyPDF2 provides PDF '
        'text extraction capabilities for the AI Policy Generator, enabling the platform to parse regulatory '
        'documents and organizational policies. Reportlab is used for dynamic PDF report generation, creating '
        'formatted compliance documents with tables, headers, and structured data presentation. SQLAlchemy serves '
        'as the ORM layer, providing database abstraction and migration management. Bcrypt handles password '
        'hashing with configurable work factors for security.'
    )

    pdf.sub_section('5.4 API Design Principles')
    pdf.body_text(
        'The API follows RESTful principles with consistent URL patterns, HTTP method usage, and response formats. '
        'Endpoints are organized around resource types: /api/users, /api/agents, /api/policies, /api/workflows, '
        'and /api/audit-logs. Authentication endpoints follow JWT token exchange patterns with access and refresh '
        'token flows. WebSocket endpoints follow the /ws/ namespace pattern. Error responses follow a consistent '
        'structure with error codes, messages, and optional detail fields for debugging.'
    )

    # ======================================================================
    # 6. DATABASE SCHEMA
    # ======================================================================
    pdf.add_page()
    pdf.section_title('6', 'Database Schema & Data Architecture')
    pdf.sub_section('6.1 Entity Relationship Overview')
    pdf.body_text(
        'The database schema defines five core entities that form the foundation of the GuardForge platform. '
        'These entities are managed through SQLAlchemy ORM models and stored in a SQLite database file (guardforge.db) '
        'during development. The schema is designed to support the platform\'s governance, monitoring, and compliance '
        'workflows while maintaining referential integrity through foreign key relationships.'
    )

    pdf.sub_section('6.2 Entity Descriptions')
    pdf.table_header(['Entity', 'Purpose', 'Key Fields', 'Relationships'])
    pdf.table_row(['User', 'Stores credentials & roles', 'id, email, hashed_password, role', 'Related to AuditLog'], fill=True)
    pdf.table_row(['Agent', 'Tracks AI entities', 'id, name, status, health, latency', 'Related to Workflow'], fill=False)
    pdf.table_row(['Policy', 'Governance rules', 'id, name, rules, version', 'Referenced by Workflow'], fill=True)
    pdf.table_row(['Workflow', 'Agent sequences for tasks', 'id, name, agent_id, policy_id', 'FK to Agent, Policy'], fill=False)
    pdf.table_row(['AuditLog', 'Compliance event trail', 'id, user_id, action, timestamp', 'FK to User'], fill=True)
    pdf.ln(4)

    pdf.sub_section('6.3 User Model Details')
    pdf.body_text(
        'The User model is the cornerstone of the authentication and authorization system. It stores email addresses '
        'as unique identifiers, hashed passwords using bcrypt with a configurable salt round count, and role '
        'designations that determine access permissions. The model supports the three defined roles - Admin, Analyst, '
        'and Viewer - each with progressively restricted capabilities. Future iterations would benefit from '
        'additional fields such as multi-factor authentication tokens, last login timestamps, and account lockout '
        'counters for security hardening.'
    )

    pdf.sub_section('6.4 Agent and Policy Models')
    pdf.body_text(
        'The Agent model tracks registered AI entities within the organization. Each agent record maintains '
        'operational metadata including current status (active, paused, error), health metrics (CPU, memory, '
        'response times), and performance indicators (latency, faithfulness score). The Policy model stores '
        'versioned governance rules that define acceptable AI behavior boundaries. Policies are versioned to '
        'support audit trails showing which policy version was in effect at any given time, which is critical '
        'for compliance investigations.'
    )

    pdf.sub_section('6.5 AuditLog Model')
    pdf.body_text(
        'The AuditLog model is central to GuardForge\'s compliance value proposition. Every user action, system '
        'event, and policy violation is captured with precise timestamps, user attribution, action descriptions, '
        'and contextual metadata. This immutable event log provides the evidentiary foundation for compliance '
        'reporting, forensic investigations, and operational analytics. The current schema would benefit from '
        'additional indexing on timestamp and user_id fields for production query performance, as well as '
        'partitioning strategies for long-term data retention.'
    )

    # ======================================================================
    # 7. AUTHENTICATION & SECURITY
    # ======================================================================
    pdf.add_page()
    pdf.section_title('7', 'Authentication, Authorization & Security')
    pdf.sub_section('7.1 Authentication Architecture')
    pdf.body_text(
        'GuardForge implements a JWT-based authentication system using the HS256 signing algorithm. When users '
        'authenticate with their credentials (email and password), the backend verifies the password against the '
        'bcrypt-hashed stored value, and upon successful verification, issues a signed JWT access token. This '
        'token is then included in subsequent API requests via the Authorization header, allowing the backend to '
        'verify the user\'s identity without repeated database lookups. The stateless nature of JWT authentication '
        'aligns well with the platform\'s RESTful API design and enables future horizontal scaling.'
    )

    pdf.sub_section('7.2 Bcrypt Password Hashing')
    pdf.body_text(
        'Password security is implemented through bcrypt, a deliberately slow hashing algorithm designed to resist '
        'brute-force and rainbow table attacks. Bcrypt incorporates a salt value to ensure that identical passwords '
        'produce different hash outputs, and its configurable work factor allows the hashing difficulty to be '
        'increased over time as hardware capabilities advance. The current implementation uses bcrypt\'s default '
        'work factor, which provides adequate security for enterprise deployments while maintaining acceptable '
        'authentication response times.'
    )

    pdf.sub_section('7.3 Role-Based Access Control (RBAC)')
    pdf.body_text(
        'The RBAC implementation defines three distinct roles with carefully scoped permissions that align with '
        'the principle of least privilege. Administrators have full system access including policy creation, '
        'modification, and user management. Analysts can view dashboards, run workflows, and manage agents but '
        'cannot modify global policies. Viewers have read-only access to logs and analytics, suitable for '
        'auditors and compliance reviewers who need visibility without modification capabilities. This role '
        'hierarchy provides a clear separation of duties that satisfies common compliance requirements.'
    )
    pdf.table_header(['Role', 'Dashboard', 'Agents', 'Policies', 'Users', 'Audit Logs', 'Scanner'])
    pdf.table_row(['Admin', 'Full', 'Full', 'Create/Edit', 'Manage', 'Full', 'Full'], fill=True)
    pdf.table_row(['Analyst', 'Full', 'Manage', 'View Only', 'View', 'Full', 'Full'], fill=False)
    pdf.table_row(['Viewer', 'View Only', 'View', 'No Access', 'No Access', 'View', 'No Access'], fill=True)
    pdf.ln(4)

    pdf.sub_section('7.4 Security Considerations')
    pdf.body_text(
        'The current security implementation provides a solid foundation but requires enhancement for production '
        'deployment. JWT token expiration policies should be implemented to limit the window of vulnerability '
        'from token theft. HTTPS enforcement is mandatory for production to prevent credential interception. '
        'Rate limiting on authentication endpoints would mitigate brute-force attacks. API key support for '
        'machine-to-machine communication would extend the platform\'s integration capabilities. Additionally, '
        'the current default admin credentials (admin@guardforge.ai / admin123) must be changed upon production '
        'deployment as they represent a significant security risk if left unchanged.'
    )

    pdf.note_box(
        'Security Recommendation: Implement refresh token rotation, short-lived access tokens (15 minutes max), '
        'and token revocation lists for comprehensive session management. Enforce HTTPS with HSTS headers in '
        'all production deployments.'
    )

    # ======================================================================
    # 8. CORE FEATURES
    # ======================================================================
    pdf.add_page()
    pdf.section_title('8', 'Core Features - In-Depth Analysis')
    pdf.body_text(
        'GuardForge delivers seven core capabilities that collectively provide comprehensive AI governance coverage. '
        'Each feature is designed to address specific enterprise needs while integrating with the broader platform '
        'ecosystem. The following sections provide detailed analysis of each feature\'s functionality, technical '
        'implementation, and governance value.'
    )

    pdf.sub_section('8.1 Live Dashboard')
    pdf.body_text(
        'The Live Dashboard serves as the primary operational interface, presenting high-level metrics that provide '
        'immediate visibility into the organization\'s AI governance posture. Key performance indicators include '
        'the total number of registered AI agents, actively running workflows, and aggregate risk scores computed '
        'from policy violation frequency and severity. The dashboard features interactive visualizations for '
        'execution trends over configurable time windows, enabling operators to identify patterns and anomalies. '
        'Policy violation distribution charts provide at-a-glance understanding of which governance rules are '
        'being triggered most frequently, helping teams prioritize policy refinement efforts.'
    )
    pdf.body_text(
        'From a technical implementation perspective, the dashboard aggregates data from multiple database tables '
        'through optimized SQL queries. The risk score computation algorithm weighs factors such as violation '
        'severity, frequency, and the criticality of affected agents. The WebSocket connection ensures that '
        'dashboard metrics update in real-time without requiring manual page refreshes, which is essential for '
        'security operations centers where situational awareness depends on current data.'
    )

    pdf.sub_section('8.2 Trace Explorer')
    pdf.body_text(
        'The Trace Explorer is arguably GuardForge\'s most powerful governance feature. It provides a live, '
        'step-by-step execution trace viewer that connects via WebSockets to stream AI agent decision-making '
        'processes in real time. Each trace captures the complete decision chain of an AI agent, including inputs '
        'received, internal reasoning steps, intermediate outputs, tool calls made, and final responses generated. '
        'This granular visibility is essential for understanding why agents make specific decisions, identifying '
        'potential bias or errors in reasoning chains, and providing evidence for compliance audits.'
    )
    pdf.body_text(
        'The trace viewer interface presents execution steps in a chronological, expandable format that allows '
        'operators to drill down into individual steps for detailed inspection. Each step captures relevant metadata '
        'such as processing time, confidence scores, and any policy checks that were applied. The real-time nature '
        'of the WebSocket connection means that traces appear as they are generated, enabling operators to monitor '
        'long-running agent workflows without polling or refreshing.'
    )

    pdf.sub_section('8.3 AI Policy Generator')
    pdf.body_text(
        'The AI Policy Generator automates one of the most labor-intensive aspects of AI governance: the translation '
        'of regulatory requirements and organizational policies into machine-enforceable governance rules. Users '
        'upload documents in PDF or text format containing policy descriptions, regulatory guidelines, or compliance '
        'requirements, and the system processes these documents using PyPDF2 for PDF extraction and natural language '
        'processing techniques to identify and structure governance rules.'
    )
    pdf.body_text(
        'The generated policies cover critical governance areas including personally identifiable information (PII) '
        'filtering rules that define what types of sensitive data AI agents must not process or expose, toxicity '
        'detection thresholds that flag inappropriate or harmful content, topic restriction boundaries that limit '
        'agent discourse to approved subject areas, and data handling requirements that enforce organizational '
        'data classification and handling procedures. Each generated policy includes version tracking, enabling '
        'organizations to maintain a complete history of policy evolution for compliance purposes.'
    )

    pdf.sub_section('8.4 Agent Management')
    pdf.body_text(
        'The Agent Management module provides comprehensive lifecycle management for AI agents deployed across '
        'the organization. Each agent is tracked with operational metadata including its current status (active, '
        'paused, error, decommissioned), health indicators (response times, error rates, resource utilization), '
        'and performance metrics (latency percentiles, faithfulness scores). The module supports bulk operations '
        'for managing agents at scale, including status updates, policy assignments, and configuration changes.'
    )
    pdf.body_text(
        'Health monitoring is implemented through periodic heartbeat checks and performance metric collection. '
        'Agents that exceed configurable latency thresholds or demonstrate degraded faithfulness scores are '
        'flagged for operator attention. The module maintains a complete history of agent state transitions, '
        'providing an audit trail of when agents were deployed, paused, or modified, which is valuable for '
        'both operational troubleshooting and compliance investigations.'
    )

    pdf.sub_section('8.5 Audit Log & Search')
    pdf.add_page()
    pdf.body_text(
        'The Audit Log subsystem maintains a persistent, immutable trail of all system events, user actions, '
        'and policy violations. Every interaction with the platform is captured with precise timestamps, user '
        'attribution, IP addresses, and detailed action descriptions. The audit log serves as the foundation for '
        'compliance reporting, enabling organizations to demonstrate adherence to regulatory requirements and '
        'internal governance policies.'
    )
    pdf.body_text(
        'A distinguishing feature of the Audit Log is its natural language query interface, which allows users '
        'to search the event history using plain English queries. This eliminates the need for specialized query '
        'language knowledge, making compliance investigations accessible to non-technical stakeholders such as '
        'legal teams and external auditors. The search functionality uses natural language processing to interpret '
        'queries and map them to structured database queries that return relevant audit events.'
    )

    pdf.sub_section('8.6 Safety Scanner & Red Teaming')
    pdf.body_text(
        'The Safety Scanner provides simulated security environments for proactively probing AI agent vulnerabilities '
        'and testing guardrail effectiveness. This red-teaming capability enables security teams to systematically '
        'test AI agents against known attack vectors including prompt injection attempts, adversarial inputs, '
        'data extraction probes, and policy boundary testing. The scanner runs configurable test suites that '
        'simulate real-world attack scenarios, providing quantitative assessments of agent robustness.'
    )
    pdf.body_text(
        'Results from safety scans are captured and tracked over time, enabling organizations to measure '
        'improvements in agent security posture as policies and guardrails are refined. The red-teaming module '
        'supports both automated scan execution and manual test case creation, giving security teams the flexibility '
        'to probe specific concerns. Scan results feed into the risk scoring system, providing data-driven '
        'visibility into organizational exposure to AI-related security risks.'
    )

    pdf.sub_section('8.7 User Management')
    pdf.body_text(
        'The User Management system provides comprehensive account lifecycle management including secure '
        'registration with email verification, profile management allowing users to update personal information '
        'and preferences, role assignment that determines access permissions, and a dedicated sign-out flow that '
        'properly terminates sessions and invalidates tokens. The system supports the three defined roles with '
        'clear permission boundaries that align with enterprise separation-of-duties requirements.'
    )
    pdf.body_text(
        'User management is accessible only to administrators, ensuring that access control modifications follow '
        'proper governance procedures. The system maintains a complete audit trail of user creation, modification, '
        'and role change events, providing transparency into who has access to what and when those permissions '
        'were granted or modified.'
    )

    # ======================================================================
    # 9. GOVERNANCE AND COMPLIANCE
    # ======================================================================
    pdf.add_page()
    pdf.section_title('9', 'Governance, Compliance & Regulatory Alignment')
    pdf.sub_section('9.1 Governance Framework Integration')
    pdf.body_text(
        'GuardForge is designed to integrate with and support multiple governance frameworks and regulatory regimes. '
        'The platform\'s policy engine can encode rules derived from the EU AI Act\'s risk-based classification '
        'system, the NIST AI Risk Management Framework\'s governance, mapping, measurement, and management functions, '
        'ISO/IEC 42001 AI management system requirements, and organizational-specific governance policies. The '
        'version-controlled policy system ensures that organizations can demonstrate which policies were in effect '
        'at any point in time, satisfying key audit requirements across all major frameworks.'
    )

    pdf.sub_section('9.2 Compliance Reporting')
    pdf.body_text(
        'The reportlab-based PDF generation engine enables dynamic creation of compliance reports that can be '
        'customized to meet specific regulatory or organizational requirements. These reports can include executive '
        'summaries for leadership, detailed technical findings for engineering teams, policy violation analyses for '
        'compliance officers, and complete audit trails for external auditors. The automated report generation '
        'eliminates the manual effort typically required for compliance documentation, reducing the administrative '
        'burden on governance teams while improving report consistency and accuracy.'
    )

    pdf.sub_section('9.3 Audit Trail Integrity')
    pdf.body_text(
        'The audit logging subsystem is designed to maintain the integrity and immutability of the event trail. '
        'Each audit entry includes a cryptographic hash chain link that connects it to the previous entry, '
        'creating a tamper-evident sequence that enables verification of log integrity. This chain-of-custody '
        'mechanism ensures that any attempt to modify or delete historical audit entries is detectable, providing '
        'the evidentiary quality required for legal and regulatory proceedings. For additional security, audit '
        'logs should be written to write-once-read-many (WORM) storage in production deployments.'
    )

    pdf.sub_section('9.4 Data Privacy and Protection')
    pdf.body_text(
        'GuardForge supports data privacy compliance through its PII filtering policies and data handling rules. '
        'The policy engine can enforce data minimization principles by restricting what data AI agents can access '
        'and process, data retention limits by automatically expiring or archiving agent inputs and outputs after '
        'configured periods, and data sovereignty requirements by controlling which geographic regions agent data '
        'can be processed or stored in. These capabilities support compliance with GDPR, CCPA, and other data '
        'protection regulations.'
    )

    # ======================================================================
    # 10. DEPLOYMENT ARCHITECTURE
    # ======================================================================
    pdf.add_page()
    pdf.section_title('10', 'Deployment Architecture & Infrastructure')
    pdf.sub_section('10.1 Current Development Deployment')
    pdf.body_text(
        'The current deployment configuration is optimized for local development and testing. The React frontend '
        'runs on Vite\'s development server at http://localhost:5173, providing hot module replacement for rapid '
        'development iteration. The FastAPI backend runs on uvicorn at http://localhost:8000, serving both HTTP API '
        'endpoints and WebSocket connections. The SQLite database file (guardforge.db) resides on the local '
        'filesystem, providing zero-configuration persistence suitable for single-developer workflows.'
    )

    pdf.sub_section('10.2 Recommended Production Architecture')
    pdf.body_text(
        'For production deployment, a more robust architecture is recommended. The frontend should be built as '
        'static assets served through a CDN or reverse proxy (Nginx, CloudFront) for global low-latency access '
        'and DDoS protection. The backend should run behind a reverse proxy with multiple uvicorn workers managed '
        'by a process supervisor (systemd, supervisord), with auto-scaling based on load metrics. The database '
        'should be migrated to PostgreSQL for concurrent access, connection pooling, and point-in-time recovery, '
        'with read replicas for analytics workloads. Redis should be added for caching, rate limiting, and '
        'pub/sub messaging. Docker containerization via the existing docker-compose.yml provides consistent '
        'deployment across environments.'
    )

    pdf.sub_section('10.3 Docker Containerization')
    pdf.body_text(
        'The project includes a docker-compose.yml file indicating containerization support. This approach '
        'provides several benefits for deployment: consistent environments across development, staging, and '
        'production; simplified dependency management with all dependencies bundled in container images; '
        'horizontal scalability through container orchestration platforms like Kubernetes; and integration '
        'with CI/CD pipelines for automated testing and deployment. The Docker setup should define separate '
        'services for the frontend (served through Nginx), the backend (uvicorn workers), and the database '
        '(production-grade, not SQLite).'
    )

    # ======================================================================
    # 11. ENTERPRISE READINESS
    # ======================================================================
    pdf.add_page()
    pdf.section_title('11', 'Enterprise Readiness Assessment')
    pdf.sub_section('11.1 Strengths')
    pdf.body_text(
        'GuardForge demonstrates several strengths that position it well for enterprise adoption. The comprehensive '
        'feature set covers the full spectrum of AI governance needs, from policy management and real-time monitoring '
        'to compliance reporting and security testing. The modular architecture enables organizations to adopt '
        'capabilities incrementally, starting with core features and expanding as governance maturity increases. '
        'The modern technology stack using React and FastAPI ensures long-term maintainability and access to '
        'extensive developer ecosystems. The role-based access control system provides the access governance '
        'that enterprise security teams require.'
    )

    pdf.sub_section('11.2 Areas for Improvement')
    pdf.body_text(
        'Several areas require attention for production enterprise readiness. The SQLite database is not suitable '
        'for production concurrent access and should be migrated to PostgreSQL. The single-factor authentication '
        '(password only) should be extended with multi-factor authentication support. The current deployment lacks '
        'TLS/HTTPS encryption, which is mandatory for production. There is no evidence of automated testing '
        'infrastructure (unit tests, integration tests, end-to-end tests), which is critical for maintaining '
        'code quality in enterprise environments. Monitoring and alerting capabilities for the platform itself '
        '(as opposed to monitored AI agents) need to be implemented.'
    )

    pdf.sub_section('11.3 Scalability Considerations')
    pdf.body_text(
        'The current architecture can scale to support small-to-medium AI agent deployments. For enterprise-scale '
        'deployments with hundreds of agents and thousands of workflows, several scalability enhancements are '
        'recommended: implement database read replicas for dashboard and analytics queries that tolerate eventual '
        'consistency; add a message queue (RabbitMQ, Redis Streams) for processing audit log entries and policy '
        'evaluation tasks asynchronously; implement data partitioning for the AuditLog table which will grow '
        'rapidly in production; and consider a microservices decomposition of the backend for independent scaling '
        'of the policy engine, trace processing, and reporting services.'
    )

    # ======================================================================
    # 12. STRATEGIC RECOMMENDATIONS
    # ======================================================================
    pdf.add_page()
    pdf.section_title('12', 'Strategic Recommendations & Roadmap')
    pdf.sub_section('12.1 Immediate Priorities (0-3 Months)')
    pdf.bullet_list([
        'Migrate database from SQLite to PostgreSQL with Alembic migration management',
        'Implement TLS/HTTPS with automated certificate management via Let\'s Encrypt',
        'Add automated test suite coverage (unit, integration, and E2E tests)',
        'Implement multi-factor authentication support',
        'Establish CI/CD pipeline with automated testing and deployment',
        'Replace default admin credentials with forced password change on first login',
    ])

    pdf.sub_section('12.2 Short-Term Goals (3-6 Months)')
    pdf.bullet_list([
        'Integrate Redis for caching, session management, and pub/sub messaging',
        'Implement rate limiting and API key authentication for programmatic access',
        'Add Prometheus/Grafana monitoring for platform health metrics',
        'Develop REST API documentation through FastAPI\'s auto-generated Swagger UI',
        'Implement audit log archiving and retention policy management',
        'Add support for additional document formats in Policy Generator (DOCX, HTML)',
    ])

    pdf.sub_section('12.3 Medium-Term Vision (6-12 Months)')
    pdf.bullet_list([
        'Implement Kubernetes deployment with Helm charts for orchestration',
        'Add machine learning-based anomaly detection in execution traces',
        'Develop third-party integration marketplace (Slack, Jira, ServiceNow)',
        'Implement multi-tenant architecture with data isolation',
        'Add advanced analytics with customizable dashboards and report scheduling',
        'Develop mobile companion application for alert management',
    ])

    pdf.sub_section('12.4 Long-Term Strategic Direction (12+ Months)')
    pdf.bullet_list([
        'AI-powered policy recommendation engine using historical violation data',
        'Federated governance for multi-cloud AI agent deployments',
        'Real-time adversarial attack detection and automated response',
        'Integration with major AI platforms (OpenAI, Anthropic, Hugging Face, LangChain)',
        'Industry-specific compliance templates (Healthcare, Finance, Government)',
        'Open-source community edition to drive adoption and ecosystem growth',
    ])

    # ======================================================================
    # 13. CONCLUSION
    # ======================================================================
    pdf.add_page()
    pdf.section_title('13', 'Conclusion')
    pdf.body_text(
        'GuardForge represents a significant and timely contribution to the enterprise AI governance landscape. '
        'As organizations increasingly deploy AI agents in production environments, the need for comprehensive '
        'governance, observability, and compliance tooling becomes critical. GuardForge addresses this need with '
        'a well-architected platform that combines real-time monitoring, automated policy enforcement, and '
        'comprehensive audit capabilities in a cohesive, modern application.'
    )
    pdf.body_text(
        'The platform\'s technical foundation - React 18 with Vite for the frontend and FastAPI with SQLAlchemy '
        'for the backend - provides a solid, maintainable base that follows current best practices in full-stack '
        'development. The glassmorphism UI design and dark-mode default are well-suited to the security operations '
        'context where the platform will primarily be used. The JWT-based authentication with RBAC provides an '
        'appropriate access control foundation that can be extended for enterprise requirements.'
    )
    pdf.body_text(
        'The seven core features - Live Dashboard, Trace Explorer, AI Policy Generator, Agent Management, Audit '
        'Log, Safety Scanner, and User Management - collectively address the key pillars of AI governance: '
        'visibility, control, compliance, and security. Each feature is thoughtfully designed to serve specific '
        'stakeholder needs while integrating with the broader platform ecosystem.'
    )
    pdf.body_text(
        'While the current implementation demonstrates solid architecture and comprehensive functionality, '
        'several enhancements are necessary for production enterprise deployment. Database migration to PostgreSQL, '
        'HTTPS enforcement, multi-factor authentication, comprehensive testing, and CI/CD pipeline establishment '
        'are critical immediate priorities. The strategic roadmap outlined in this report provides a phased '
        'approach to evolving GuardForge from a capable development platform to a production-grade enterprise '
        'solution.'
    )
    pdf.body_text(
        'In conclusion, GuardForge has the potential to become a cornerstone platform for enterprise AI governance. '
        'Its comprehensive feature set, modern architecture, and clear governance focus address a genuine and '
        'growing market need. With continued investment in production hardening, scalability, and ecosystem '
        'integration, GuardForge is well-positioned to help organizations navigate the complex and evolving '
        'landscape of AI governance, safety, and compliance.'
    )

    pdf.ln(6)
    pdf.set_draw_color(0, 102, 204)
    pdf.set_line_width(0.5)
    pdf.line(10, pdf.get_y(), 200, pdf.get_y())
    pdf.ln(4)
    pdf.set_font('Helvetica', 'I', 10)
    pdf.set_text_color(100, 100, 100)
    pdf.cell(0, 6, 'End of Report', align='C', new_x='LMARGIN', new_y='NEXT')
    pdf.cell(0, 6, 'Prepared by Antigravity AI - Governance Division', align='C', new_x='LMARGIN', new_y='NEXT')
    pdf.cell(0, 6, 'Classification: Internal - Confidential', align='C', new_x='LMARGIN', new_y='NEXT')
    pdf.cell(0, 6, 'May 15, 2026', align='C', new_x='LMARGIN', new_y='NEXT')

    # OUTPUT
    output_path = '/home/ali/Code/Projects/GuardForge/GuardForge_Professional_Report.pdf'
    pdf.output(output_path)
    return output_path


if __name__ == '__main__':
    path = build_report()
    print(f'Report generated: {path}')

    # count pages
    from fpdf import FPDF as _test
    import re
    with open(path, 'rb') as f:
        content = f.read()
    # PDF page count: count objects or use /Type /Page entries
    page_count = content.count(b'/Type /Page') - content.count(b'/Type /Pages')
    print(f'Total pages (excluding cover): ~{page_count}')
