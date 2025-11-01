import { Chart, useChart } from "@chakra-ui/charts";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { InfoIcon } from "lucide-react";
import type { WalletBalance } from "../types/wallet.types";
import { formatDate, formatMoney } from "../utils";
import type { Transaction } from "../types/transaction.types";

export function GraphSection({
  walletBalance,
  transactions,
}: {
  walletBalance: WalletBalance | null;
  transactions: Transaction[];
}) {
  const balances = [
    {
      title: "Ledger Balance",
      amount: formatMoney(walletBalance?.ledger_balance || 0),
    },
    {
      title: "Total Payout",
      amount: formatMoney(walletBalance?.total_payout || 0),
    },
    {
      title: "Total Revenue",
      amount: formatMoney(walletBalance?.total_revenue || 0),
    },
    {
      title: "Pending Payout",
      amount: formatMoney(walletBalance?.pending_payout || 0),
    },
  ];

  const chart = useChart({
    data: transactions.map((transaction) => ({
      sale: transaction?.amount,
      month: formatDate(transaction?.date),
    })),
    series: [{ name: "sale", color: "#FF5403" }],
  });

  return (
    <div className='graph-section'>
      <div className='graph'>
        <div className='graph-header'>
          <div className='title'>
            <p>Available Balance</p>
            <h1>{formatMoney(walletBalance?.balance || 0)}</h1>
          </div>
          <button>Withdraw</button>
        </div>
        <div className='graph-container'>
          <Chart.Root maxH='sm' chart={chart}>
            <LineChart
              data={chart.data}
              margin={{ left: -5, right: 0, top: 0, bottom: 20 }}
            >
              <CartesianGrid stroke={chart.color("border")} vertical={false} />
              <XAxis
                axisLine={false}
                dataKey={chart.key("month")}
                tickFormatter={(value) => value}
                stroke={chart.color("border")}
                ticks={[
                  chart.data[0]?.month,
                  chart.data[chart.data.length - 1]?.month,
                ]}
                interval={0}
                tick={{ fontSize: 14, fill: "#56616b" }}
              />
              <YAxis
                axisLine={false}
                tick={false}
                width={0}
                stroke={chart.color("border")}
              />
              {chart.series.map((item) => (
                <Line
                  type='natural'
                  key={item.name}
                  isAnimationActive={false}
                  dataKey={chart.key(item.name)}
                  stroke={chart.color(item.color)}
                  strokeWidth={1}
                  dot={false}
                />
              ))}
            </LineChart>
          </Chart.Root>
        </div>
      </div>
      <div></div>
      <div className='balances'>
        {balances.map((balance, index) => (
          <div className='balance' key={index}>
            <div>
              <p>{balance.title}</p>
              <h1>{balance.amount}</h1>
            </div>
            <InfoIcon size={20} color='#888F95' />
          </div>
        ))}
      </div>
    </div>
  );
}
