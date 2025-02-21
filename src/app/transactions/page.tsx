// "use client";
// import useSWR from "swr";
// import { useSearchParams } from "next/navigation";
// import { Card, CardContent } from "@/components/ui/card";
// import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";

// const Transactions = () => {
//   const searchParams = useSearchParams();
//   const referralCode = searchParams.get("referralCode") || "pra7432"; // Default for testing

//   console.log("Frontend Referral Code:", referralCode); // Debugging

//   // Fetch transactions only if referralCode is available
//   const fetcher = (url: string) => fetch(`${url}?ref=${referralCode}`).then((res) => res.json());
//   const { data, error, isLoading } = useSWR(referralCode ? `/api/transactions` : null, fetcher);

//   if (isLoading) return <p className="text-center text-gray-500">Loading transactions...</p>;

//   if (error) {
//     return <p className="text-center text-red-500">Failed to load transactions. Please try again.</p>;
//   }
//   const transactions = data?.transactions || [];
//   const totalEarnings = data?.totalEarnings || 0;

//   return (
//     <div className="container mx-auto p-4 md:p-6">
//       <h1 className="text-xl md:text-2xl font-bold mb-4 text-center">Transactions</h1>
//        {/* Total Earnings Display */}
//        <div className="text-center text-lg font-semibold mb-4">
//         Total Earnings: <span className="text-green-600">₹{totalEarnings}</span>
//       </div>
//       <Card>
//         <CardContent className="overflow-x-auto">
//           <Table className="min-w-full">
//             <TableHeader>
//               <TableRow>
//                 <TableHead className="text-xs md:text-sm font-semibold">Name</TableHead>
//                 <TableHead className="text-xs md:text-sm font-semibold">Amount</TableHead>
//                 <TableHead className="text-xs md:text-sm font-semibold">Date</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {transactions.length > 0 ? (
//                 transactions.map((txn: any, index: number) => (
//                   <TableRow key={index}>
//                     <TableCell className="text-xs md:text-sm text-black">{txn.name}</TableCell>
//                     <TableCell className="text-xs md:text-sm text-black">₹{txn.amount}</TableCell>
//                     <TableCell className="text-xs md:text-sm text-black">
//                       {new Date(txn.date).toLocaleDateString()}
//                     </TableCell>
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={3} className="text-center text-xs md:text-sm text-gray-500">
//                     No transactions found
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default Transactions;
"use client";
import useSWR from "swr";
import { useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";

const Transactions = () => {
  const searchParams = useSearchParams();
  const referralCode = searchParams.get("referralCode") || "pra7432"; // Default for testing

  console.log("Frontend Referral Code:", referralCode); // Debugging

  // Fetcher function to get transactions
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  
  // Ensure API call includes referralCode
  const { data, error, isLoading } = useSWR(
    referralCode ? `/api/transactions?ref=${referralCode}` : null,
    fetcher
  );

  console.log("Fetched Transactions Data:", data); // Debugging

  if (isLoading) return <p className="text-center text-gray-500">Loading transactions...</p>;

  if (error) {
    return <p className="text-center text-red-500">Failed to load transactions. Please try again.</p>;
  }

  const transactions = data?.transactions || [];
  const totalEarnings = data?.totalEarnings || 0;

  return (
    <div className="container mx-auto p-4 md:p-6">
      <h1 className="text-xl md:text-2xl font-bold mb-4 text-center">Transactions</h1>
      
      {/* Total Earnings Display */}
      <div className="text-center text-lg font-semibold mb-4">
        Total Earnings: <span className="text-green-600">₹{totalEarnings}</span>
      </div>

      <Card>
        <CardContent className="overflow-x-auto">
          <Table className="min-w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs md:text-sm font-semibold">Name</TableHead>
                <TableHead className="text-xs md:text-sm font-semibold">Amount</TableHead>
                <TableHead className="text-xs md:text-sm font-semibold">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.length > 0 ? (
                transactions.map((txn: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell className="text-xs md:text-sm text-black">{txn.name}</TableCell>
                    <TableCell className="text-xs md:text-sm text-black">₹{txn.amount}</TableCell>
                    <TableCell className="text-xs md:text-sm text-black">
                      {new Date(txn.date).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center text-xs md:text-sm text-gray-500">
                    No transactions found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Transactions;
