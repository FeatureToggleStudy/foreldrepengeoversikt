import { guid } from 'nav-frontend-js-utils';
import { Attachment, Skjemanummer } from 'common/storage/attachment/types/Attachment';

const generateAttachmentId = () => 'V'.concat(guid().replace(/-/g, ''));

export const mapFileToAttachment = (file: File, skjemanummer: Skjemanummer): Attachment => ({
    id: generateAttachmentId(),
    file,
    filename: file.name,
    filesize: file.size,
    pending: false,
    skjemanummer
});

export const isAttachmentWithError = ({ pending, url, error }: Attachment) => error || (!pending && url === undefined);
