import {
  Megaphone,
  MapPin,
  Video,
  Ticket,
  QrCode,
  Bell,
  Star,
  Mic,
  Trophy,
  Store,
  Sparkles,
  ShieldCheck,
  Zap,
  Users,
  MessageCircle,
  Mail,
  Handshake,
  Heart,
  Eye,
  Gift,
  Camera,
  Phone,
  Globe,
  Rocket,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const ICONS: Record<string, LucideIcon> = {
  Megaphone,
  MapPin,
  Video,
  Ticket,
  QrCode,
  Bell,
  Star,
  Mic,
  Trophy,
  Store,
  Sparkles,
  ShieldCheck,
  Zap,
  Users,
  MessageCircle,
  Mail,
  Handshake,
  Heart,
  Eye,
  Gift,
  Camera,
  Phone,
  Globe,
  Rocket,
};

export const ICON_NAMES = Object.keys(ICONS);

export function getIcon(name: string): LucideIcon {
  return ICONS[name] ?? Sparkles;
}
