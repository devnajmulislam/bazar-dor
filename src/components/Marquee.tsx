import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

interface IMarqueeType {
  id: number;
  nameBn: string;
  categoryIcon: string;
  unit: string;
  today: number;
  change: {
    dir: string;
    pct: number;
  };
}

const Marquee = async () => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products",
  );
  const data = await res.json();

  console.log(data, "from Marquee file");

  return (
<div className="container mx-autoF">
      <MarqueeText direction="right" duration={10}>
      <div>
        {data.map((p:IMarqueeType) => (
          <span key={p.id}>
            <span>{p.categoryIcon}</span>
            <span>{p.nameBn}</span>
            <span>{p.today}</span>
            <span>tk</span>
            <span>{p.unit}</span>
            <span>{p?.change?.dir}</span>
            <span>{p?.change?.pct}</span>
          </span>
        ))}
      </div>
    </MarqueeText>
</div>
  );
};

export default Marquee;

