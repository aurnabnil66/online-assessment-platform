import { Mail, PhoneCall } from "lucide-react";
import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="bg-slate-950 text-white px-4 sm:px-8 lg:px-20 py-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3 text-sm sm:text-base">
          <span>Powered by</span>
          <span className="font-bold text-lg">
            {" "}
            <div>
              <Image
                src={"/resourceLogoFooter.png"}
                alt=""
                height={100}
                width={100}
              />
            </div>
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-sm">
          <p className="text-sm">Helpline</p>
          <div className="flex items-center gap-2">
            <PhoneCall size={18} />
            <span>+88 011020202505</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail size={18} />
            <span>support@akij.work</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
