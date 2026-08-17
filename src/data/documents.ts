/**
 * The fake backend. `localStorage` with delusions of persistence.
 *
 * The key is `docuManager_docs`, matching the rename away from the old ERP
 * product name. Anyone who opened an earlier build reseeds from the example
 * data on first load, which is the intended behaviour for a prototype with
 * no backend behind it.
 */

export type DocumentStatus = 'Approved' | 'Pending' | 'Rejected';
export type DocumentType = 'Invoice' | 'Production Order';

export type DocumentVersion = {
  version: number;
  date: string;
  size: string;
};

export type ManagedDocument = {
  id: string;
  title: string;
  type: DocumentType;
  linkedRecord: string;
  status: DocumentStatus;
  uploadDate: string;
  uploadedBy: string;
  fileSize: string;
  description: string;
  tags: string[];
  versions: DocumentVersion[];
  auditTrail: string[];
};

export const STORAGE_KEY = 'docuManager_docs';
export const CURRENT_USER = 'Maria López';
export const MAX_TAGS = 20;
export const MAX_FILE_SIZE_MB = 100;

/** `2025-01-15 14:22`, which is what the audit trail has always looked like. */
export function stamp(): string {
  return new Date().toISOString().slice(0, 16).replace('T', ' ');
}

export function today(): string {
  return new Date().toISOString().slice(0, 10);
}

const SEED: ManagedDocument[] = [
  {
    id: 'DOC-20250115-001',
    title: 'Invoice_SUPP-XYZ_Jan2025.pdf',
    type: 'Invoice',
    linkedRecord: 'Invoice #INV-250101',
    status: 'Approved',
    uploadDate: '2025-01-15',
    uploadedBy: 'Maria López',
    fileSize: '3.8',
    description: 'Monthly supplier invoice for raw materials batch A-47',
    tags: ['supplier-xyz', 'urgent', 'q1', 'finance'],
    versions: [{ version: 1, date: '2025-01-15', size: '3.8 MB' }],
    auditTrail: [
      '2025-01-15 14:22 – Uploaded by Maria López',
      '2025-01-16 09:10 – Approved by QA Manager',
    ],
  },
  {
    id: 'DOC-20250120-002',
    title: 'Production_Order_PO-47892.pdf',
    type: 'Production Order',
    linkedRecord: 'Production Order #PO-47892',
    status: 'Pending',
    uploadDate: '2025-01-20',
    uploadedBy: 'Maria López',
    fileSize: '1.2',
    description: 'Order for 500 units of brake discs – line 3',
    tags: ['production', 'line-3', 'brake-discs'],
    versions: [
      { version: 1, date: '2025-01-20', size: '1.2 MB' },
      { version: 2, date: '2025-01-21', size: '1.3 MB' },
    ],
    auditTrail: [
      '2025-01-20 10:05 – Uploaded by Maria López',
      '2025-01-21 08:30 – New version uploaded',
    ],
  },
  {
    id: 'DOC-20250122-003',
    title: 'Invoice_SUPP-ABC_Feb2025.pdf',
    type: 'Invoice',
    linkedRecord: 'Invoice #INV-250202',
    status: 'Approved',
    uploadDate: '2025-01-22',
    uploadedBy: 'Maria López',
    fileSize: '4.1',
    description: '',
    tags: ['supplier-abc', 'q1'],
    versions: [{ version: 1, date: '2025-01-22', size: '4.1 MB' }],
    auditTrail: ['2025-01-22 16:45 – Uploaded', '2025-01-23 11:20 – Approved'],
  },
  {
    id: 'DOC-20250125-004',
    title: 'Production_Order_PO-47915.pdf',
    type: 'Production Order',
    linkedRecord: 'Production Order #PO-47915',
    status: 'Rejected',
    uploadDate: '2025-01-25',
    uploadedBy: 'Maria López',
    fileSize: '0.9',
    description: 'Urgent order for 200 gearbox housings',
    tags: ['urgent', 'gearbox', 'line-2'],
    versions: [{ version: 1, date: '2025-01-25', size: '0.9 MB' }],
    auditTrail: ['2025-01-25 09:15 – Uploaded', '2025-01-25 14:30 – Rejected by Production'],
  },
  {
    id: 'DOC-20250128-005',
    title: 'Invoice_SUPP-DEF_Jan2025.pdf',
    type: 'Invoice',
    linkedRecord: 'Invoice #INV-250128',
    status: 'Pending',
    uploadDate: '2025-01-28',
    uploadedBy: 'Maria López',
    fileSize: '2.7',
    description: 'Spare parts delivery invoice',
    tags: ['supplier-def', 'spare-parts'],
    versions: [
      { version: 1, date: '2025-01-28', size: '2.7 MB' },
      { version: 2, date: '2025-01-29', size: '2.8 MB' },
      { version: 3, date: '2025-01-30', size: '2.8 MB' },
    ],
    auditTrail: [
      '2025-01-28 13:10 – Uploaded',
      '2025-01-29 10:00 – New version',
      '2025-01-30 08:45 – New version',
    ],
  },
  {
    id: 'DOC-20250201-006',
    title: 'Production_Order_PO-47988.pdf',
    type: 'Production Order',
    linkedRecord: 'Production Order #PO-47988',
    status: 'Approved',
    uploadDate: '2025-02-01',
    uploadedBy: 'Maria López',
    fileSize: '1.5',
    description: 'Order for 1200 sensor housings',
    tags: ['production', 'sensor', 'q1'],
    versions: [{ version: 1, date: '2025-02-01', size: '1.5 MB' }],
    auditTrail: ['2025-02-01 11:20 – Uploaded', '2025-02-02 07:55 – Approved'],
  },
  {
    id: 'DOC-20250203-007',
    title: 'Invoice_SUPP-XYZ_Feb2025.pdf',
    type: 'Invoice',
    linkedRecord: 'Invoice #INV-250203',
    status: 'Approved',
    uploadDate: '2025-02-03',
    uploadedBy: 'Maria López',
    fileSize: '5.2',
    description: 'Large batch raw steel invoice',
    tags: ['supplier-xyz', 'raw-material'],
    versions: [{ version: 1, date: '2025-02-03', size: '5.2 MB' }],
    auditTrail: ['2025-02-03 15:30 – Uploaded', '2025-02-04 09:15 – Approved'],
  },
  {
    id: 'DOC-20250205-008',
    title: 'Production_Order_PO-48012.pdf',
    type: 'Production Order',
    linkedRecord: 'Production Order #PO-48012',
    status: 'Pending',
    uploadDate: '2025-02-05',
    uploadedBy: 'Maria López',
    fileSize: '2.1',
    description: '',
    tags: ['line-1', 'urgent'],
    versions: [{ version: 1, date: '2025-02-05', size: '2.1 MB' }],
    auditTrail: ['2025-02-05 08:40 – Uploaded'],
  },
  {
    id: 'DOC-20250210-009',
    title: 'Invoice_SUPP-ABC_Feb2025.pdf',
    type: 'Invoice',
    linkedRecord: 'Invoice #INV-250210',
    status: 'Approved',
    uploadDate: '2025-02-10',
    uploadedBy: 'Maria López',
    fileSize: '3.4',
    description: 'Maintenance service invoice',
    tags: ['supplier-abc', 'maintenance'],
    versions: [{ version: 1, date: '2025-02-10', size: '3.4 MB' }],
    auditTrail: ['2025-02-10 12:00 – Uploaded', '2025-02-11 10:30 – Approved'],
  },
  {
    id: 'DOC-20250212-010',
    title: 'Production_Order_PO-48045.pdf',
    type: 'Production Order',
    linkedRecord: 'Production Order #PO-48045',
    status: 'Approved',
    uploadDate: '2025-02-12',
    uploadedBy: 'Maria López',
    fileSize: '0.8',
    description: 'Small test batch for new product',
    tags: ['test', 'new-product', 'line-3'],
    versions: [
      { version: 1, date: '2025-02-12', size: '0.8 MB' },
      { version: 2, date: '2025-02-13', size: '0.9 MB' },
    ],
    auditTrail: [
      '2025-02-12 14:15 – Uploaded',
      '2025-02-13 09:20 – New version uploaded',
      '2025-02-13 16:45 – Approved',
    ],
  },
];

export function loadDocuments(): ManagedDocument[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved) as ManagedDocument[];
  } catch {
    // Corrupt or unavailable storage is not worth a broken screen — reseed.
  }
  saveDocuments(SEED);
  return SEED;
}

export function saveDocuments(documents: ManagedDocument[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(documents));
  } catch {
    // Private browsing, quota, a locked-down kiosk. The session still works.
  }
}

/** Status maps to a `Badge` tone. The label always ships alongside it. */
export function statusTone(status: DocumentStatus): 'success' | 'warning' | 'critical' {
  if (status === 'Approved') return 'success';
  if (status === 'Pending') return 'warning';
  return 'critical';
}

export function uniqueTags(documents: ManagedDocument[]): string[] {
  const tags = new Set<string>();
  for (const doc of documents) for (const tag of doc.tags) tags.add(tag);
  return [...tags].sort();
}

export type Filters = {
  search: string;
  type: '' | DocumentType;
  activeTags: string[];
};

export const NO_FILTERS: Filters = { search: '', type: '', activeTags: [] };

export function filtersAreActive(filters: Filters): boolean {
  return Boolean(filters.search || filters.type || filters.activeTags.length);
}

export function applyFilters(documents: ManagedDocument[], filters: Filters): ManagedDocument[] {
  const needle = filters.search.trim().toLowerCase();
  return documents.filter((doc) => {
    const matchesSearch =
      !needle ||
      doc.title.toLowerCase().includes(needle) ||
      doc.description.toLowerCase().includes(needle);
    const matchesType = !filters.type || doc.type === filters.type;
    const matchesTags = filters.activeTags.every((tag) => doc.tags.includes(tag));
    return matchesSearch && matchesType && matchesTags;
  });
}
