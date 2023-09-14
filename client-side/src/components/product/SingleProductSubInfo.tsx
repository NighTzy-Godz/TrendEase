interface SingleProductSubInfoProps {
  title: string;
  data: string | number | undefined;
}

function SingleProductSubInfo({ title, data }: SingleProductSubInfoProps) {
  return (
    <div className="single_product_subInfo">
      <h3>{title}: </h3>
      <p>{data}</p>
    </div>
  );
}

export default SingleProductSubInfo;
