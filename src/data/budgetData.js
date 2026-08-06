import TagIcon from "../assets/icons/sell.svg?react";
import MoneyIcon from "../assets/icons/payments.svg?react";
import CardIcon from "../assets/icons/credit_card.svg?react";
import InfinityIcon from "../assets/icons/all_inclusive.svg?react";

export const budgetOptions = [
  {
    id: 1,
    title: "Under 40 EGP",
    description:
      "Super affordable meals using essential daily ingredients.",
    icon: TagIcon,
  },
  {
    id: 2,
    title: "40 – 80 EGP",
    description:
      "Balanced budget for everyday fresh homemade food.",
    icon: MoneyIcon,
  },
  {
    id: 3,
    title: "80 – 150 EGP",
    description:
      "Flexible budget with wider organic and protein options.",
    icon: CardIcon,
  },
  {
    id: 4,
    title: "No Strict Limit",
    description:
      "Focus purely on nutrition regardless of ingredient cost.",
    icon: InfinityIcon,
  },
];