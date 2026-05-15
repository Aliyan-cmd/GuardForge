import * as Lucide from 'lucide-react';

const icons = [
  'Shield', 'Activity', 'Eye', 'Cpu', 'Zap', 'Lock', 'BarChart3',
  'ArrowRight', 'CheckCircle', 'Play', 'ChevronRight', 'Star',
  'Globe', 'Users', 'FileText', 'AlertTriangle', 'Layers', 'Sparkles',
  'MessageSquare', 'Send', 'Twitter', 'Github', 'Linkedin', 'Mail'
];

icons.forEach(name => {
  if (!(name in Lucide)) {
    console.log(`Icon ${name} is MISSING!`);
  }
});
