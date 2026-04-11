export default function CustomButton({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <button
      type="submit"
      className="w-full rounded-xl bg-[#6633FF] py-3.5 text-base text-white shadow-lg transition hover:scale-[1.01] active:scale-[0.99]"
    >
      {children}
    </button>
  );
}
