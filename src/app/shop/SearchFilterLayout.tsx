"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ProductsSort } from "@/wix-api/products";
import type { Collection } from "@/types/wix";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useOptimistic, useState, useTransition } from "react";
import { Menu, Filter, X } from "lucide-react";

interface SearchFilterLayoutProps {
  collections: Collection[];
  children: React.ReactNode;
}

export default function SearchFilterLayout({
  collections,
  children,
}: SearchFilterLayoutProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  const [optimisticFilters, setOptimisticFilters] = useOptimistic({
    collection: searchParams.getAll("collection"),
    price_min: searchParams.get("price_min") || undefined,
    price_max: searchParams.get("price_max") || undefined,
    sort: searchParams.get("sort") || undefined,
  });

  const [isPending, startTransition] = useTransition();

  function updateFilters(updates: Partial<typeof optimisticFilters>) {
    const newState = { ...optimisticFilters, ...updates };
    const newSearchParams = new URLSearchParams(searchParams);

    Object.entries(newState).forEach(([key, value]) => {
      newSearchParams.delete(key);

      if (Array.isArray(value)) {
        value.forEach((v) => newSearchParams.append(key, v));
      } else if (value) {
        newSearchParams.set(key, value);
      }
    });

    newSearchParams.delete("page");

    startTransition(() => {
      setOptimisticFilters(newState);
      router.push(`?${newSearchParams.toString()}`);
    });
  }

  // Count active filters
  const activeFiltersCount =
    optimisticFilters.collection.length +
    (optimisticFilters.price_min ? 1 : 0) +
    (optimisticFilters.price_max ? 1 : 0);

  return (
    <main className="flex flex-col items-center justify-center gap-6 px-5 py-10">
      {/* Header with Hamburger and Sort */}
      <div className="flex w-full max-w-7xl items-center justify-between">
        {/* <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span>Filters</span>
              {activeFiltersCount > 0 && (
                <span className="bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80 sm:w-96">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filters
              </SheetTitle>
              <SheetDescription>
                Filter products by price range
              </SheetDescription>
            </SheetHeader>
            
            <div className="mt-6 space-y-6" data-pending={isPending ? "" : undefined}>
              <CollectionsFilter
                collections={collections}
                selectedCollectionIds={optimisticFilters.collection}
                updateCollectionIds={(collectionIds) =>
                  updateFilters({ collection: collectionIds })
                }
              />
              <PriceFilter
                minDefaultInput={optimisticFilters.price_min}
                maxDefaultInput={optimisticFilters.price_max}
                updatePriceRange={(priceMin, priceMax) =>
                  updateFilters({
                    price_min: priceMin,
                    price_max: priceMax,
                  })
                }
              />
              
              {activeFiltersCount > 0 && (
                <div className="pt-4 border-t">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      updateFilters({ 
                        collection: [], 
                        price_min: undefined, 
                        price_max: undefined 
                      });
                      setIsOpen(false);
                    }}
                    className="w-full"
                  >
                    Clear All Filters
                  </Button>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet> */}
        {/* 🔹 Dialog Version (Sheet kept below for future use) */}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              <span>Filters</span>
              {activeFiltersCount > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                  {activeFiltersCount}
                </span>
              )}
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filters
              </DialogTitle>
              <DialogDescription>
                Filter products by price range
              </DialogDescription>
            </DialogHeader>

            <div
              className="mt-6 space-y-6"
              data-pending={isPending ? "" : undefined}
            >
              {/* <CollectionsFilter
                collections={collections}
                selectedCollectionIds={optimisticFilters.collection}
                updateCollectionIds={(collectionIds) =>
                  updateFilters({ collection: collectionIds })
                }
              /> */}

              <PriceFilter
                minDefaultInput={optimisticFilters.price_min}
                maxDefaultInput={optimisticFilters.price_max}
                updatePriceRange={(priceMin, priceMax) =>
                  updateFilters({
                    price_min: priceMin,
                    price_max: priceMax,
                  })
                }
              />

              {activeFiltersCount > 0 && (
                <div className="border-t pt-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      updateFilters({
                        collection: [],
                        price_min: undefined,
                        price_max: undefined,
                      });
                      setIsOpen(false);
                    }}
                    className="w-full"
                  >
                    Clear All Filters
                  </Button>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>

        {/* Sort Filter */}
        <SortFilter
          sort={optimisticFilters.sort}
          updateSort={(sort) => updateFilters({ sort })}
        />
      </div>

      {/* Active Filters Display */}
      {activeFiltersCount > 0 && (
        <div className="w-full max-w-7xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Active filters:
            </span>
            {optimisticFilters.collection.map((collectionId) => {
              const collection = collections.find(
                (c) => c._id === collectionId,
              );
              return (
                <Button
                  key={collectionId}
                  variant="secondary"
                  size="sm"
                  onClick={() =>
                    updateFilters({
                      collection: optimisticFilters.collection.filter(
                        (id) => id !== collectionId,
                      ),
                    })
                  }
                  className="h-7 text-xs"
                >
                  {collection?.name}
                  <X className="ml-1 h-3 w-3" />
                </Button>
              );
            })}
            {(optimisticFilters.price_min || optimisticFilters.price_max) && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() =>
                  updateFilters({ price_min: undefined, price_max: undefined })
                }
                className="h-7 text-xs"
              >
                Price: {optimisticFilters.price_min || "0"} -{" "}
                {optimisticFilters.price_max || "∞"}
                <X className="ml-1 h-3 w-3" />
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Products Content */}
      <div className="w-full max-w-7xl">{children}</div>
    </main>
  );
}

interface CollectionsFilterProps {
  collections: Collection[];
  selectedCollectionIds: string[];
  updateCollectionIds: (collectionIds: string[]) => void;
}

function CollectionsFilter({
  collections,
  selectedCollectionIds,
  updateCollectionIds,
}: CollectionsFilterProps) {
  return (
    <div className="space-y-3">
      <div className="font-bold">Collections</div>
      <ul className="max-h-64 space-y-1.5 overflow-y-auto">
        {collections.map((collection) => {
          const collectionId = collection._id;
          if (!collectionId) return null;
          return (
            <li key={collectionId}>
              <label className="flex cursor-pointer items-center gap-2 font-medium">
                <Checkbox
                  id={collectionId}
                  checked={selectedCollectionIds.includes(collectionId)}
                  onCheckedChange={(checked) => {
                    updateCollectionIds(
                      checked
                        ? [...selectedCollectionIds, collectionId]
                        : selectedCollectionIds.filter(
                            (id) => id !== collectionId,
                          ),
                    );
                  }}
                />
                <span className="line-clamp-1 break-all text-sm">
                  {collection.name}
                </span>
              </label>
            </li>
          );
        })}
      </ul>
      {selectedCollectionIds.length > 0 && (
        <button
          onClick={() => updateCollectionIds([])}
          className="text-sm text-primary hover:underline"
        >
          Clear Collections
        </button>
      )}
    </div>
  );
}

interface PriceFilterProps {
  minDefaultInput: string | undefined;
  maxDefaultInput: string | undefined;
  updatePriceRange: (min: string | undefined, max: string | undefined) => void;
}

function PriceFilter({
  minDefaultInput,
  maxDefaultInput,
  updatePriceRange,
}: PriceFilterProps) {
  const [minInput, setMinInput] = useState(minDefaultInput);
  const [maxInput, setMaxInput] = useState(maxDefaultInput);

  useEffect(() => {
    setMinInput(minDefaultInput || "");
    setMaxInput(maxDefaultInput || "");
  }, [minDefaultInput, maxDefaultInput]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    updatePriceRange(minInput || undefined, maxInput || undefined);
  }

  return (
    <div className="space-y-3">
      <div className="font-bold">Price Range</div>
      <form className="flex items-center gap-2" onSubmit={onSubmit}>
        <Input
          type="number"
          name="min"
          placeholder="Min"
          value={minInput}
          onChange={(e) => setMinInput(e.target.value)}
          className="flex-1"
        />
        <span className="text-muted-foreground">-</span>
        <Input
          type="number"
          name="max"
          placeholder="Max"
          value={maxInput}
          onChange={(e) => setMaxInput(e.target.value)}
          className="flex-1"
        />
        <Button type="submit" size="sm">
          Go
        </Button>
      </form>
      {(!!minDefaultInput || !!maxDefaultInput) && (
        <button
          onClick={() => updatePriceRange(undefined, undefined)}
          className="text-sm text-primary hover:underline"
        >
          Clear Price
        </button>
      )}
    </div>
  );
}

interface SortFilterProps {
  sort: string | undefined;
  updateSort: (value: ProductsSort) => void;
}

function SortFilter({ sort, updateSort }: SortFilterProps) {
  return (
    <Select value={sort || "last_updated"} onValueChange={updateSort}>
      <SelectTrigger className="w-fit gap-2 text-start">
        <span>
          Sort by: <SelectValue />
        </span>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="last_updated">Newest</SelectItem>
        <SelectItem value="price_asc">Price (Low to high)</SelectItem>
        <SelectItem value="price_desc">Price (High to low)</SelectItem>
      </SelectContent>
    </Select>
  );
}
