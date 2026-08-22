/*
 * ═══════════════════════════════════════════════════════════════
 * Service definitions — content provided by client.
 * Do not modify substance without client approval.
 *
 * Used by: Services page (not yet built), Services preview cards
 * ═══════════════════════════════════════════════════════════════
 */

import { Ship, Plane, FileText, Warehouse, Truck, ShieldCheck } from 'lucide-react';

const SERVICES = [
  {
    id: 'ocean-freight',
    title: 'Ocean Freight',
    icon: Ship,
    description:
      'Full container (FCL) and shared container (LCL) shipping, booked on the routes and carriers that fit your timeline and budget — with visibility into your shipment\u2019s status at every stage, not just at pickup and arrival.',
  },
  {
    id: 'air-freight',
    title: 'Air Freight',
    icon: Plane,
    description:
      'For cargo that can\u2019t wait on a vessel schedule. We compare rates and transit times across carriers so speed doesn\u2019t come with an unexplained markup.',
  },
  {
    id: 'customs-brokerage',
    title: 'Customs Brokerage & Documentation',
    icon: FileText,
    description:
      'Classification, clearance, and paperwork handled end-to-end and checked before it becomes a problem at the border — not fixed after a shipment is already held up.',
  },
  {
    id: 'warehousing',
    title: 'Warehousing',
    icon: Warehouse,
    description:
      'Short- and long-term storage for cargo in transit or awaiting distribution, with clear handling and inventory visibility.',
  },
  {
    id: 'land-trucking',
    title: 'Land / Trucking Transport',
    icon: Truck,
    description:
      'Inland movement connecting ports to final delivery points, coordinated as part of the same shipment — not handed off to a disconnected third party.',
  },
  {
    id: 'cargo-insurance',
    title: 'Cargo Insurance',
    icon: ShieldCheck,
    description:
      'Coverage options explained plainly at the time of booking, so you know what\u2019s protected before something goes wrong, not after.',
  },
];

export default SERVICES;
