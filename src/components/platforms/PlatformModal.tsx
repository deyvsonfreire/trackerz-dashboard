import { Modal } from '@/components/ui/Modal';
import { Platform } from '@/types';
import { PlatformForm } from './PlatformForm';

interface PlatformModalProps {
  isOpen: boolean;
  onClose: () => void;
  platform: Partial<Platform> | null;
  onSubmit: (platform: Partial<Platform>) => void;
}

export function PlatformModal({ isOpen, onClose, platform, onSubmit }: PlatformModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={platform?.id ? 'Editar Plataforma' : 'Adicionar Plataforma'}>
      <PlatformForm platform={platform} onSubmit={onSubmit} onCancel={onClose} />
    </Modal>
  );
}