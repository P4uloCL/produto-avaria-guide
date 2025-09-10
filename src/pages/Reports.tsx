import { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { 
  BarChart3, 
  Download, 
  FileText, 
  Calendar, 
  TrendingUp,
  DollarSign,
  Package,
  Users,
  ArrowLeft,
  Filter
} from 'lucide-react';

interface SaleReport {
  id: string;
  date: string;
  product: string;
  originalPrice: number;
  discount: string;
  finalPrice: number;
  seller: string;
  approver: string;
  damageId: string;
}

export default function Reports() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    sector: '',
    seller: ''
  });

  // Dados simulados
  const salesReports: SaleReport[] = [
    {
      id: '1',
      date: '2024-01-15',
      product: 'Televisão Samsung 50"',
      originalPrice: 1999.99,
      discount: '10%',
      finalPrice: 1799.99,
      seller: 'João Silva',
      approver: 'Maria Santos',
      damageId: 'AV001'
    },
    {
      id: '2',
      date: '2024-01-14',
      product: 'Microondas LG 30L',
      originalPrice: 899.99,
      discount: '25%',
      finalPrice: 674.99,
      seller: 'Ana Costa',
      approver: 'Carlos Lima',
      damageId: 'AV002'
    },
    {
      id: '3',
      date: '2024-01-13',
      product: 'Geladeira Electrolux 400L',
      originalPrice: 3299.99,
      discount: '50%',
      finalPrice: 1649.99,
      seller: 'Pedro Oliveira',
      approver: 'Maria Santos',
      damageId: 'AV003'
    }
  ];

  const summaryStats = {
    totalSales: salesReports.length,
    totalRevenue: salesReports.reduce((sum, sale) => sum + sale.finalPrice, 0),
    totalDiscount: salesReports.reduce((sum, sale) => sum + (sale.originalPrice - sale.finalPrice), 0),
    averageDiscount: '28%'
  };

  const handleExportPDF = () => {
    toast({
      title: "Relatório exportado",
      description: "O relatório foi gerado em PDF com sucesso.",
    });
  };

  const handleExportCSV = () => {
    toast({
      title: "Relatório exportado",
      description: "O relatório foi gerado em CSV com sucesso.",
    });
  };

  const applyFilters = () => {
    toast({
      title: "Filtros aplicados",
      description: "Os resultados foram atualizados conforme os filtros selecionados.",
    });
  };

  return (
    <Layout title="Relatórios de Vendas">
      <div className="space-y-6">
        {/* Ações do Cabeçalho */}
        <div className="flex items-center justify-between">
          <Button 
            variant="outline" 
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar ao Dashboard
          </Button>

          <div className="flex gap-2">
            <Button 
              variant="outline"
              onClick={handleExportCSV}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
            <Button 
              onClick={handleExportPDF}
              className="bg-destructive hover:bg-destructive/90 text-destructive-foreground flex items-center gap-2"
            >
              <FileText className="h-4 w-4" />
              Export PDF
            </Button>
          </div>
        </div>

        {/* Estatísticas Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-l-4 border-l-primary">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total de Vendas</p>
                  <p className="text-2xl font-bold text-foreground">{summaryStats.totalSales}</p>
                </div>
                <Package className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-success">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Receita Total</p>
                  <p className="text-2xl font-bold text-foreground">
                    R$ {summaryStats.totalRevenue.toFixed(2)}
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-destructive">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Desconto Total</p>
                  <p className="text-2xl font-bold text-foreground">
                    R$ {summaryStats.totalDiscount.toFixed(2)}
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-destructive" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-warning">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Desconto Médio</p>
                  <p className="text-2xl font-bold text-foreground">{summaryStats.averageDiscount}</p>
                </div>
                <BarChart3 className="h-8 w-8 text-warning" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtros */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filtros de Relatório
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Data Início</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={filters.startDate}
                  onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="endDate">Data Fim</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={filters.endDate}
                  onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="sector">Setor</Label>
                <Select onValueChange={(value) => setFilters({ ...filters, sector: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o setor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os Setores</SelectItem>
                    <SelectItem value="alimentar">Alimentar</SelectItem>
                    <SelectItem value="higiene">Higiene e Beleza</SelectItem>
                    <SelectItem value="limpeza">Limpeza</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-end">
                <Button onClick={applyFilters} className="w-full bg-primary hover:bg-primary/90">
                  Aplicar Filtros
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabela de Vendas */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Vendas de Produtos Avariados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 font-medium text-muted-foreground">Data da Venda</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Produto</th>
                    <th className="text-right p-4 font-medium text-muted-foreground">Preço Original</th>
                    <th className="text-center p-4 font-medium text-muted-foreground">Desconto</th>
                    <th className="text-right p-4 font-medium text-muted-foreground">Preço Final</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Vendedor</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Aprovador</th>
                    <th className="text-center p-4 font-medium text-muted-foreground">ID Avaria</th>
                  </tr>
                </thead>
                <tbody>
                  {salesReports.map((sale) => (
                    <tr key={sale.id} className="border-b border-border hover:bg-muted/50">
                      <td className="p-4">
                        {new Date(sale.date).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="p-4 font-medium">{sale.product}</td>
                      <td className="p-4 text-right">R$ {sale.originalPrice.toFixed(2)}</td>
                      <td className="p-4 text-center">
                        <span className="bg-destructive text-destructive-foreground px-2 py-1 rounded text-sm">
                          {sale.discount}
                        </span>
                      </td>
                      <td className="p-4 text-right font-semibold text-success">
                        R$ {sale.finalPrice.toFixed(2)}
                      </td>
                      <td className="p-4">{sale.seller}</td>
                      <td className="p-4">{sale.approver}</td>
                      <td className="p-4 text-center">
                        <span className="bg-muted px-2 py-1 rounded text-sm font-mono">
                          {sale.damageId}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {salesReports.length === 0 && (
              <div className="text-center py-12">
                <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg font-medium text-muted-foreground">Nenhuma venda encontrada</p>
                <p className="text-sm text-muted-foreground">Ajuste os filtros de período para ver os resultados.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}