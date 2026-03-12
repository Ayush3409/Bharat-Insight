export default function SkeletonLoader() {
  return (
    <div className="glass rounded-xl p-6 animate-pulse">
      <div className="h-10 bg-white/10 rounded mb-4" />
      <div className="space-y-3">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="h-12 bg-white/10 rounded" />
        ))}
      </div>
    </div>
  );
}
