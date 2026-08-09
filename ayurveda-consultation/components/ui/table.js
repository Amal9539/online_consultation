export function Table({ className = "", ...props }) {
  return (
    <div className="relative w-full overflow-auto">
      <table className={`w-full caption-bottom text-sm ${className}`} {...props} />
    </div>
  );
}
export function TableHeader({ ...props }) { return <thead {...props} />; }
export function TableBody({ ...props }) { return <tbody {...props} />; }
export function TableRow({ ...props }) { return <tr className="border-b" {...props} />; }
export function TableHead({ ...props }) { return <th className="h-12 px-4 text-left align-middle font-medium" {...props} />; }
export function TableCell({ ...props }) { return <td className="p-4 align-middle" {...props} />; }
