import { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { 
  Upload, 
  Package, 
  AlertTriangle, 
  Percent, 
  User, 
  Camera,
  Printer,
  Save,
  ArrowLeft
} from 'lucide-react';

export default function RegisterDamage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    sku: '',
    productName: '',
    damageDescription: '',
    authorizedDiscount: '',
    responsible: '',
    photos: [] as File[]
  });

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (formData.photos.length + files.length > 3) {
      toast({
        title: "Limite excedido",
        description: "Máximo de 3 fotos permitidas",
        variant: "destructive"
      });
      return;
    }
    setFormData({ ...formData, photos: [...formData.photos, ...files] });
  };

  const removePhoto = (index: number) => {
    const newPhotos = formData.photos.filter((_, i) => i !== index);
    setFormData({ ...formData, photos: newPhotos });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Avaria registrada com sucesso!",
      description: "O produto foi adicionado ao sistema de avarias.",
    });
    navigate('/damage-list');
  };

  const generateLabel = () => {
    toast({
      title: "Etiqueta gerada!",
      description: "A etiqueta foi enviada para impressão.",
    });
  };

  return (
    <Layout title="Registrar Avaria">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="outline" 
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar ao Dashboard
          </Button>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="bg-primary text-primary-foreground">
            <CardTitle className="flex items-center gap-2 text-xl">
              <AlertTriangle className="h-6 w-6" />
              Registrar Produto Avariado
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Identificação do Produto */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <Package className="h-5 w-5 text-primary" />
                  Identificação do Produto
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="sku">SKU / EAN *</Label>
                    <Input
                      id="sku"
                      placeholder="Digite o código do produto"
                      value={formData.sku}
                      onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="productName">Nome do Produto *</Label>
                    <Input
                      id="productName"
                      placeholder="Nome completo do produto"
                      value={formData.productName}
                      onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Descrição da Avaria */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                  Detalhes da Avaria
                </h3>
                
                <div className="space-y-2">
                  <Label htmlFor="damageDescription">Descrição da Avaria *</Label>
                  <Textarea
                    id="damageDescription"
                    placeholder="Descreva detalhadamente o tipo de avaria encontrada no produto..."
                    rows={4}
                    value={formData.damageDescription}
                    onChange={(e) => setFormData({ ...formData, damageDescription: e.target.value })}
                    required
                  />
                </div>

                {/* Upload de Fotos */}
                <div className="space-y-4">
                  <Label className="flex items-center gap-2">
                    <Camera className="h-4 w-4" />
                    Fotos da Avaria (máx. 3)
                  </Label>
                  
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        Clique para fazer upload ou arraste as imagens aqui
                      </p>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                        id="photo-upload"
                      />
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => document.getElementById('photo-upload')?.click()}
                      >
                        Selecionar Fotos
                      </Button>
                    </div>
                  </div>

                  {/* Preview das fotos */}
                  {formData.photos.length > 0 && (
                    <div className="grid grid-cols-3 gap-4">
                      {formData.photos.map((photo, index) => (
                        <div key={index} className="relative">
                          <img
                            src={URL.createObjectURL(photo)}
                            alt={`Foto ${index + 1}`}
                            className="w-full h-24 object-cover rounded border"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                            onClick={() => removePhoto(index)}
                          >
                            ×
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Autorização de Desconto */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <Percent className="h-5 w-5 text-success" />
                  Autorização de Desconto
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="authorizedDiscount">Desconto Autorizado (%)</Label>
                    <Select onValueChange={(value) => setFormData({ ...formData, authorizedDiscount: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o desconto" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10">10% - Avaria leve</SelectItem>
                        <SelectItem value="25">25% - Avaria moderada</SelectItem>
                        <SelectItem value="50">50% - Avaria grave</SelectItem>
                        <SelectItem value="75">75% - Avaria severa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="responsible">Responsável pela Autorização *</Label>
                    <Input
                      id="responsible"
                      placeholder="Nome do responsável"
                      value={formData.responsible}
                      onChange={(e) => setFormData({ ...formData, responsible: e.target.value })}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Botões de Ação */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
                <Button 
                  type="submit"
                  className="flex-1 bg-success hover:bg-success/90 text-success-foreground"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Salvar Registro
                </Button>
                
                <Button 
                  type="button"
                  onClick={generateLabel}
                  className="flex-1 bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                >
                  <Printer className="h-4 w-4 mr-2" />
                  Gerar Etiqueta
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}