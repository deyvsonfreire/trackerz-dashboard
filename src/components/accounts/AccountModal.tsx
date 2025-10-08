import { Modal } from '@/components/ui/Modal';
import { Account } from '@/types';
import { AccountForm } from './AccountForm';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  account: Partial<Account> | null;
  onSubmit: (account: Partial<Account>) => void;
}

export function AccountModal({ isOpen, onClose, account, onSubmit }: AccountModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={account?.id ? 'Editar Conta' : 'Adicionar Conta'}>
      <AccountForm account={account} onSubmit={onSubmit} onCancel={onClose} />
    </Modal>
  );
}