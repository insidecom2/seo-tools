import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  Activity,
  BarChart3,
  ChevronDown,
  FileText,
  History,
  LogOut,
  Menu,
  Settings2,
  User,
  X,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import { Button } from '@/src/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/src/components/ui/dropdown-menu';
import Http from '../utils/http';

type NavGroup = {
  label: string;
  description: string;
  items: Array<{
    href: string;
    label: string;
    description: string;
    icon: LucideIcon;
  }>;
};

const navGroups: NavGroup[] = [
  {
    label: 'Binance',
    description: 'Market logs and settings',
    items: [
      {
        href: '/dashboard/binance/future_xgb_logs',
        label: 'Future XGB Logs',
        description: 'Model output, confidence, and entries',
        icon: Activity,
      },
      {
        href: '/dashboard/binance/config',
        label: 'Config',
        description: 'Keys and runtime settings',
        icon: Settings2,
      },
    ],
  },
  {
    label: 'Posts',
    description: 'Publishing operations',
    items: [
      {
        href: '/dashboard/posts',
        label: 'Lists',
        description: 'Content sync, edit, and upload actions',
        icon: FileText,
      },
    ],
  },
];

export default function NavbarTop() {
  const [userData, setUserData] = useState<any>({});
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    callApi();
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [router.asPath]);

  const callApi = async () => {
    await Http.get(`/api/user`)
      .then((response) => {
        if (response) setUserData(response.data.data);
      })
      .catch((e) => {});
  };

  const handleLogout = async () => {
    await Http.post(`/api/logout`)
      .then(() => {
        Cookies.remove('token');
        router.push('/');
      })
      .catch((e) => {});
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/dashboard" passHref legacyBehavior>
          <a className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-200 bg-slate-50 text-slate-700">
              <BarChart3 className="h-4 w-4" />
            </span>
            <span>Dashboard</span>
          </a>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          <Link href="/dashboard/binance/history" passHref legacyBehavior>
            <a className="inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900">
              <History className="h-4 w-4 text-slate-400" />
              <span>History</span>
            </a>
          </Link>
          {navGroups.map((group) => (
            <DropdownMenu key={group.label}>
              <DropdownMenuTrigger className="rounded-full px-3.5 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900">
                {group.label}
                <ChevronDown className="h-4 w-4 text-slate-400" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mt-3 min-w-[22rem] rounded-xl border border-slate-200 bg-white p-2 shadow-sm">
                <div className="border-b border-slate-100 px-3 py-2">
                  <div className="text-sm font-semibold text-slate-900">
                    {group.label}
                  </div>
                  <div className="mt-1 text-xs text-slate-500">
                    {group.description}
                  </div>
                </div>
                <div className="grid gap-1 p-1">
                {group.items.map((item) => (
                  <Link key={item.href} href={item.href} passHref legacyBehavior>
                    <a className="flex items-start gap-3 rounded-lg px-3 py-3 transition hover:bg-slate-50">
                      <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-slate-200 bg-slate-50 text-slate-600">
                        <item.icon className="h-4 w-4" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm font-medium text-slate-900">
                          {item.label}
                        </span>
                        <span className="mt-0.5 block text-xs leading-5 text-slate-500">
                          {item.description}
                        </span>
                      </span>
                    </a>
                  </Link>
                ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <div className="inline-flex items-center gap-2 rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-700">
            <User className="h-4 w-4" />
            <span>{userData?.name || 'User'}</span>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        <Button
          variant="outline"
          size="sm"
          className="md:hidden"
          onClick={() => setMobileOpen((current) => !current)}
          aria-expanded={mobileOpen}
          aria-label="Toggle navigation"
        >
          {mobileOpen ? (
            <X className="h-4 w-4" />
          ) : (
            <Menu className="h-4 w-4" />
          )}
        </Button>
      </div>

      {mobileOpen ? (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6">
            <Link href="/dashboard/binance/history" passHref legacyBehavior>
              <a className="flex items-start gap-3 rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700 transition hover:bg-slate-50 hover:text-slate-900">
                <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-slate-200 bg-slate-50 text-slate-600">
                  <History className="h-4 w-4" />
                </span>
                <span className="min-w-0">
                  <span className="block font-medium text-slate-900">History</span>
                  <span className="mt-0.5 block text-xs leading-5 text-slate-500">
                    Funding, PnL, and win-rate summary
                  </span>
                </span>
              </a>
            </Link>
            {navGroups.map((group) => (
              <div key={group.label} className="space-y-2">
                <div className="space-y-1">
                  <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {group.label}
                  </div>
                  <div className="text-xs text-slate-500">{group.description}</div>
                </div>
                <div className="flex flex-col gap-1">
                  {group.items.map((item) => (
                    <Link key={item.href} href={item.href} passHref legacyBehavior>
                      <a className="flex items-start gap-3 rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700 transition hover:bg-slate-50 hover:text-slate-900">
                        <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-slate-200 bg-slate-50 text-slate-600">
                          <item.icon className="h-4 w-4" />
                        </span>
                        <span className="min-w-0">
                          <span className="block font-medium text-slate-900">
                            {item.label}
                          </span>
                          <span className="mt-0.5 block text-xs leading-5 text-slate-500">
                            {item.description}
                          </span>
                        </span>
                      </a>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            <div className="flex items-center justify-between gap-3 border-t border-slate-200 pt-4">
              <div className="inline-flex min-w-0 items-center gap-2 text-sm text-slate-700">
                <User className="h-4 w-4 shrink-0" />
                <span className="truncate">{userData?.name || 'User'}</span>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
