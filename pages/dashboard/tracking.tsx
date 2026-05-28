import { useState } from "react";
import NavbarTop from "@/src/components/nav";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { HTTP_STATUS_CODE } from "@/src/utils/constants";
import Http from "@/src/utils/http";

export interface dataFormData {
  keyword: string;
  url: string;
}

export default function Tracking() {
  const [formData, setFormData] = useState<dataFormData>({
    keyword: "",
    url: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [position, setPosition] = useState<string>("0");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoading && e.target.checkValidity()) {
      setIsLoading(true);
      try {
        const response: any = await Http.post(
          "/api/tools/check_rang",
          formData
        );
        if (response.status === HTTP_STATUS_CODE.OK) {
          if (response.data.status) {
            setPosition(response.data.data.position ?? 0);
          }
        }
        setIsLoading(false);
      } catch (error) {
        setPosition(error.message);
        setIsLoading(false);
      }
    }
  };

  const handleChange = (ele) => {
    const { name, value } = ele.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };
  return (
    <div>
      <NavbarTop />
      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6">
        <div className="mx-auto w-full max-w-2xl rounded-lg border border-border bg-card p-6 text-card-foreground shadow-sm">
          <h2 className="mb-6 text-2xl font-semibold text-card-foreground">
            Tracking Keyword
          </h2>
          <form onSubmit={(e) => handleSubmit(e)} className="space-y-4">
            <div className="space-y-2">
              <label
                className="block text-sm font-medium text-muted-foreground"
                htmlFor="keyword"
              >
                Keyword
              </label>
              <Input
                id="keyword"
                name="keyword"
                type="text"
                required
                placeholder="Enter keyword"
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <label
                className="block text-sm font-medium text-muted-foreground"
                htmlFor="url"
              >
                Url
              </label>
              <Input
                id="url"
                name="url"
                type="text"
                required
                onChange={handleChange}
                placeholder="Enter url"
              />
            </div>

            <Button variant="primary" className="w-full sm:w-1/2" type="submit">
              Search
            </Button>
            <div className="py-2 text-sm text-muted-foreground">
              Result:{" "}
              {isLoading ? (
                <span className="inline-flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-border border-t-foreground" />
                  Loading
                </span>
              ) : (
                position
              )}
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
