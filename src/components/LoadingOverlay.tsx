export default function LoadingOverlay() {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-75 mx-auto mb-4"></div>
        <p className="text-grey-35">Submitting your message...</p>
      </div>
    </div>
  );
}
