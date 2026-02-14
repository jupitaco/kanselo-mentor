import Button from "@/components/ui/button";
import { ActionSuccess } from "@/public/svgs/svgs";

export default function page() {
  return (
    <main className="grid place-items-center min-h-[80vh]">

      <article className="flex flex-col items-center justify-center gap-4">
        <ActionSuccess />
        <hgroup className="my-5 text-center">
          <h3 className="mb-2">Payment cancelled 😞</h3>
          <h5>Your payment was cancelled, check your wallet for balance</h5>
        </hgroup>
        <Button link href="/wallet-and-transactions" className="pry-btn w-full text-center">
          Wallet & Transactions
        </Button>
      </article>
    </main>
  );
}
