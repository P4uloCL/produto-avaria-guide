import { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { 
  Search, 
  Filter, 
  Edit3, 
  Trash2, 
  Printer, 
  Eye,
  ArrowLeft,
  Plus,
  Package,
  Calendar
} from 'lucide-react';

interface DamageItem {
  id: string;
  sku: string;
  product: string;
  description: string;
  status: 'pending' | 'approved' | 'sold';
  date: string;
  responsible: string;
  discount: string;
}

export default function DamageList() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Dados simulados
  const damageItems: DamageItem[] = [
    {
      id: '001',
      sku: '7891234567890',
      product: 'Refrigerante Coca-Cola 2L',
      description: 'Lata amassada na lateral',
      status: 'pending',
      date: '2024-01-15',
      responsible: 'João Silva',
      discount: '10%'
    },
    {
      id: '002',
      sku: '7891234567891',
      product: 'Biscoito Trakinas 126g',
      description: 'Embalagem rasgada',
      status: 'approved',
      date: '2024-01-14',
      responsible: 'Maria Santos',
      discount: '25%'
    },
    {
      id: '003',
      sku: '7891234567892',
      product: 'Shampoo Seda 325ml',
      description: 'Tampa quebrada',
      status: 'sold',
      date: '2024-01-13',
      responsible: 'Carlos Lima',
      discount: '50%'
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: 'Pendente', variant: 'secondary' as const },
      approved: { label: 'Aprovado', variant: 'default' as const },
      sold: { label: 'Vendido', variant: 'destructive' as const }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const handleEdit = (id: string) => {
    toast({
      title: "Editando item",
      description: `Abrindo edição do item ${id}`,
    });
  };

  const handleDelete = (id: string) => {
    toast({
      title: "Item removido",
      description: "O item foi removido da lista de avarias.",
      variant: "destructive"
    });
  };

  const handlePrint = (id: string) => {
    toast({
      title: "Imprimindo etiqueta",
      description: `Etiqueta do item ${id} enviada para impressão.`,
    });
  };

  const filteredItems = damageItems.filter(item => {
    const matchesSearch = item.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.sku.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <Layout title="Itens Avariados">
      <div className="space-y-6">
        {/* Ações do Cabeçalho */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <Button 
            variant="outline" 
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar ao Dashboard
          </Button>

          <Button 
            onClick={() => navigate('/register-damage')}
            className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
          >
            <Plus className="h-4 w-4 mr-2" />
            Nova Avaria
          </Button>
        </div>

        {/* Filtros */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filtros de Busca
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por produto ou SKU..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="sm:w-48">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os Status</SelectItem>
                    <SelectItem value="pending">Pendente</SelectItem>
                    <SelectItem value="approved">Aprovado</SelectItem>
                    <SelectItem value="sold">Vendido</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lista de Itens */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Lista de Produtos Avariados ({filteredItems.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {filteredItems.length === 0 ? (
              <div className="text-center py-12">
                <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg font-medium text-muted-foreground">Nenhum item encontrado</p>
                <p className="text-sm text-muted-foreground">Ajuste os filtros ou cadastre uma nova avaria.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredItems.map((item) => (
                  <div key={item.id} className="border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      {/* Informações do Produto */}
                      <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-lg text-foreground">{item.product}</h3>
                            <p className="text-sm text-muted-foreground">SKU: {item.sku}</p>
                          </div>
                          {getStatusBadge(item.status)}
                        </div>
                        
                        <p className="text-foreground">{item.description}</p>
                        
                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(item.date).toLocaleDateString('pt-BR')}
                          </div>
                          <div>Responsável: {item.responsible}</div>
                          <div className="font-medium text-destructive">Desconto: {item.discount}</div>
                        </div>
                      </div>

                      {/* Ações */}
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEdit(item.id)}
                          className="flex items-center gap-1"
                        >
                          <Edit3 className="h-4 w-4" />
                          Editar
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handlePrint(item.id)}
                          className="flex items-center gap-1"
                        >
                          <Printer className="h-4 w-4" />
                          Etiqueta
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDelete(item.id)}
                          className="flex items-center gap-1 text-destructive hover:bg-destructive hover:text-destructive-foreground"
                        >
                          <Trash2 className="h-4 w-4" />
                          Remover
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}