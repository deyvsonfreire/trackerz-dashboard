import { useState } from 'react';
import { Platform } from '@/types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/Button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PlatformFormProps {
  platform?: Platform;
  onSubmit: (data: Partial<Platform>) => void;
  onCancel: () => void;
}

// Helper type guard
function isPlatformType(value: string): value is Platform['type'] {
  return ['social', 'ads', 'email', 'crm', 'analytics'].includes(value);
}

export function PlatformForm({ platform, onSubmit, onCancel }: PlatformFormProps) {
  const [name, setName] = useState(platform?.name || '');
  const [type, setType] = useState(platform?.type || 'social');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isPlatformType(type)) {
      onSubmit({ name, type });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Nome da Plataforma</Label>
        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="type">Tipo</Label>
        <Select value={type} onValueChange={(value) => setType(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione o tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="social">Social</SelectItem>
            <SelectItem value="ads">Ads</SelectItem>
            <SelectItem value="email">Email</SelectItem>
            <SelectItem value="crm">CRM</SelectItem>
            <SelectItem value="analytics">Analytics</SelectItem>
          </SelectContent>
        </Select>
        </div>

        <div className="flex justify-end gap-2 mt-6"> <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">Salvar</Button>
      </div>
    </form>
  );
}