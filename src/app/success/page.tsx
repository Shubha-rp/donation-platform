export default function SuccessPage() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-green-100 text-black">
        <h1 className="text-3xl font-bold">🎉 Payment Successful!</h1>
        <p className="mt-2">Thank you for your donation. Your support means a lot! 🙌</p>
        <a href="/" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Go to Home
        </a>
      </div>
    );
  }
  