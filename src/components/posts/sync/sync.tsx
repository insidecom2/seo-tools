import { syncStatus } from "@/src/enums/syncStatus";
import { SyncStatus } from "@/src/types/syncStatus";
import { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
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
  const items: SyncOption[] = [
    { key: "facebook", label: "Facebook", status: facebook },
    { key: "website", label: "Website", status: website },
    {
      key: "google_business",
      label: "Google Business",
      status: googleBusiness,
    },
  ];

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
  }, [id]);

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
      <h5 className="mb-3">Title : {title}</h5>
      <ListGroup>
        {items.map((it) => (
          <ListGroup.Item
            key={it.key}
            className="d-flex justify-content-between align-items-center"
          >
            <div>{it.label}</div>
            <div>
              {it.status === "completed" ? (
                <FaCheck className="text-success" />
              ) : (
                <button
                  type="button"
                  className="btn btn-link p-0"
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
                    className={`text-secondary ${spinning[it.key] || it.status == syncStatus.IN_PROGRESS ? "spin" : ""}`}
                  />
                </button>
              )}
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}
