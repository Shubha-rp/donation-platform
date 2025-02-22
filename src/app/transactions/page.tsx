"use client";
import useSWR from "swr";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";

interface Transaction {
  _id: string;
  fullName: string;
  email: string;
  amount: number;
  referralCode?: string;
  status: string;
  createdAt: string;
}

const fetcher = async (url: string): Promise<{ transactions: Transaction[] }> => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch transactions");
  return res.json();
};

const Transactions = () => {
  const { data, error, isLoading } = useSWR("/api/get-transactions", fetcher, {
    revalidateOnFocus: false,
  });

  const transactions: Transaction[] = data?.transactions || [];

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Transactions</h2>

      {isLoading && <p className="text-center text-gray-500">Loading transactions...</p>}
      {error && <p className="text-center text-red-500">❌ Failed to load transactions</p>}

      <Card>
        <CardContent className="overflow-x-auto">
          <Table className="min-w-full">
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead className="text-sm font-semibold p-2">#</TableHead>
                <TableHead className="text-sm font-semibold p-2">Name</TableHead>
                <TableHead className="text-sm font-semibold p-2">Email</TableHead>
                <TableHead className="text-sm font-semibold p-2">Amount</TableHead>
                <TableHead className="text-sm font-semibold p-2">Referral Code</TableHead>
                <TableHead className="text-sm font-semibold p-2">Status</TableHead>
                <TableHead className="text-sm font-semibold p-2">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.length > 0 ? (
                transactions.map((txn, index) => (
                  <TableRow key={txn._id}>
                    <TableCell className="text-sm text-black p-2">{index + 1}</TableCell>
                    <TableCell className="text-sm text-black p-2">{txn.fullName}</TableCell>
                    <TableCell className="text-sm text-black p-2">{txn.email}</TableCell>
                    <TableCell className="text-sm text-black p-2">₹{txn.amount}</TableCell>
                    <TableCell className="text-sm text-black p-2">{txn.referralCode || "N/A"}</TableCell>
                    <TableCell className="text-sm text-black p-2">{txn.status}</TableCell>
                    <TableCell className="text-sm text-black p-2">
                      {new Date(txn.createdAt).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-sm text-gray-500 py-4">
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
