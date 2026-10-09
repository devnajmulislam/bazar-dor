import Link from "next/link";

interface ICategoryType {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

const NavLinks = async () => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/categories",
  );
  const data: ICategoryType[] = await res.json();

  return (
    <nav className=" container mx-auto bg-[#fcfcfc] border-gray-100">
      <div className="overflow-x-auto no-scrollbar">
        <div className="flex items-center justify-start gap-4 md:gap-4 min-w-max">
          {data.map((item) => (
            <Link
              key={item.id}
              href={`/category/${item.slug}`}
              className="flex items-center gap-2 text-slate-800 hover:text-primary transition-colors text-sm md:text-base font-semibold"
            >
              {item.icon && <span className="text-lg">{item.icon}</span>}
              <span>{item.nameBn}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavLinks;
