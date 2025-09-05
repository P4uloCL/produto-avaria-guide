import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { 
  AlertTriangle, 
  FileText, 
  BarChart3, 
  Package, 
  TrendingDown, 
  Clock,
  ArrowRight,
  Plus
} from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: 'Registrar Avaria',
      description: 'Cadastrar novo produto avariado',
      icon: AlertTriangle,
      color: 'bg-destructive',
      textColor: 'text-destructive-foreground',
      action: () => navigate('/register-damage'),
      buttonText: 'Novo Registro'
    },
    {
      title: 'Itens Avariados',
      description: 'Consultar produtos em avaria',
      icon: Package,
      color: 'bg-primary',
      textColor: 'text-primary-foreground',
      action: () => navigate('/damage-list'),
      buttonText: 'Ver Lista'
    },
    {
      title: 'Relatórios',
      description: 'Análises e vendas de avaria',
      icon: BarChart3,
      color: 'bg-success',
      textColor: 'text-success-foreground',
      action: () => navigate('/reports'),
      buttonText: 'Ver Relatórios'
    }
  ];

  const stats = [
    {
      title: 'Avarias Hoje',
      value: '12',
      icon: TrendingDown,
      color: 'text-destructive'
    },
    {
      title: 'Pendentes',
      value: '8',
      icon: Clock,
      color: 'text-warning'
    },
    {
      title: 'Vendidas Hoje',
      value: '4',
      icon: BarChart3,
      color: 'text-success'
    }
  ];

  return (
    <Layout title="Dashboard">
      <div className="space-y-8">
        {/* Estatísticas Rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="border-l-4 border-l-primary">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold text-foreground">
                      {stat.value}
                    </p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Ações Principais */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Ações Principais</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickActions.map((action, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer group">
                <CardHeader className="pb-4">
                  <div className={`w-12 h-12 rounded-lg ${action.color} flex items-center justify-center mb-4`}>
                    <action.icon className={`h-6 w-6 ${action.textColor}`} />
                  </div>
                  <CardTitle className="text-xl font-bold text-foreground">
                    {action.title}
                  </CardTitle>
                  <p className="text-muted-foreground">
                    {action.description}
                  </p>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={action.action}
                    className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground group-hover:bg-destructive/80"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    {action.buttonText}
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Atividades Recentes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Atividades Recentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { time: '10:30', action: 'Produto avariado registrado', product: 'Refrigerante Coca-Cola 2L', user: 'João Silva' },
                { time: '09:45', action: 'Etiqueta impressa', product: 'Biscoito Trakinas 126g', user: 'Maria Santos' },
                { time: '09:15', action: 'Desconto autorizado', product: 'Shampoo Seda 325ml', user: 'Carlos Lima' },
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                  <div className="flex items-center space-x-4">
                    <div className="text-sm font-medium text-muted-foreground bg-muted px-2 py-1 rounded">
                      {activity.time}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{activity.action}</p>
                      <p className="text-sm text-muted-foreground">{activity.product}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{activity.user}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}