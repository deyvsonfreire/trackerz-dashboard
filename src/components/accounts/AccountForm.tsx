import { useEffect, useState } from 'react';
import { Account, Platform } from '@/types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/Button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { createClient } from '@/utils/supabase/client';

interface AccountFormProps {
  account: Partial<Account> | null;
  onSubmit: (account: Partial<Account>) => void;
  onCancel: () => void;
}

export function AccountForm({ account, onSubmit, onCancel }: AccountFormProps) {
  const [name, setName] = useState(account?.name || '');
  const [platformId, setPlatformId] = useState(account?.platformId || '');
  const [accountId, setAccountId] = useState(account?.accountId || '');
  const [budget, setBudget] = useState(account?.budget || 0);
  const [platforms, setPlatforms] = useState<Platform[]>([]);

  useEffect(() => {
    const fetchPlatforms = async () => {
      const supabase = createClient();
      const { data } = await supabase.from('platforms').select('*');
      if (data) {
        setPlatforms(data);
      }
    };
    fetchPlatforms();
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit({ name, platformId, accountId, budget: Number(budget) });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Nome da Conta</Label>
        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="platformId">Plataforma</Label>
        <Select value={platformId} onValueChange={setPlatformId}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione a plataforma" />
          </SelectTrigger>
          <SelectContent>
            {platforms.map(p => (
              <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="accountId">ID da Conta na Plataforma</Label>
        <Input id="accountId" value={accountId} onChange={(e) => setAccountId(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="budget">Orçamento (R$)</Label>
        <Input id="budget" type="number" value={budget} onChange={(e) => setBudget(Number(e.target.value))} required />
      </div>
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">Salvar</Button>
      </div>
    </form>
  );
}