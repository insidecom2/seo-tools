import { syncStatus } from "@/src/enums/syncStatus";
import { Button } from "@/src/components/ui/button";
import { SyncStatus } from "@/src/types/syncStatus";
import { useEffect, useMemo, useState } from "react";
import { FaCheck, FaRotate } from "react-icons/fa6";
import { useSync } from "./hooks/useSync";

type SyncOption = {
  key: string;
  label: string;
  status: SyncStatus;
};

interface syncProps {
  id: number;
  facebook: SyncStatus;
  website: SyncStatus;
  googleBusiness: SyncStatus;
  title: string;
}

export default function Sync({
  id,
  facebook,
  website,
  googleBusiness,
  title,
}: syncProps) {
  const items: SyncOption[] = useMemo(
    () => [
      { key: "facebook", label: "Facebook", status: facebook },
      { key: "website", label: "Website", status: website },
      {
        key: "google_business",
        label: "Google Business",
        status: googleBusiness,
      },
    ],
    [facebook, googleBusiness, website],
  );

  const [spinning, setSpinning] = useState<Record<string, boolean>>({});
  const syncPost = useSync(id);

  useEffect(() => {
    const initialSpinning: Record<string, boolean> = {};
    items.forEach((it) => {
      it.status == syncStatus.IN_PROGRESS
        ? (initialSpinning[it.key] = true)
        : (initialSpinning[it.key] = false);
    });
    setSpinning(initialSpinning);
  }, [items]);

  const onHandleSync = async (type: string) => {
    if (spinning[type]) return;
    setSpinning((s) => ({ ...s, [type]: true }));
    try {
      await syncPost.mutateAsync({ type });
    } catch (error) {
      setSpinning((s) => ({ ...s, [type]: false }));
    }
  };

  return (
    <div>
      <h5 className="mb-3 text-lg font-semibold">Title : {title}</h5>
      <div className="overflow-hidden rounded-md border border-slate-200">
        {items.map((it) => (
          <div
            key={it.key}
            className="flex items-center justify-between border-b border-slate-200 px-4 py-3 last:border-b-0"
          >
            <div className="text-sm font-medium text-slate-800">{it.label}</div>
            <div>
              {it.status === "completed" ? (
                <FaCheck className="text-emerald-600" />
              ) : (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    onHandleSync(
                      (it.key as string) === "facebook"
                        ? "facebook"
                        : (it.key as string) === "website"
                          ? "website"
                          : "google_business",
                    )
                  }
                  aria-label={`retry-${it.key}`}
                >
                  <FaRotate
                    className={`${spinning[it.key] || it.status == syncStatus.IN_PROGRESS ? "spin text-slate-700" : "text-slate-500"}`}
                  />
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
