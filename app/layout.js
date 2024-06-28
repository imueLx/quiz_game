import { Raleway } from "next/font/google";
import "./globals.css";
import Image from "next/image";

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Quiz App",
  description: "Test your knowledge with our quiz app!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={raleway.className}>
        <div className="bg-images">
          <div className="bg-image bg-image-nurse-cap">
            <Image
              src="/images/nurse-cap.png"
              alt="Nurse Cap"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div className="bg-image bg-image-nurse-casual">
            <Image
              src="/images/nurse-casual.png"
              alt="Nurse Casual"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div className="bg-image bg-image-stethoscope">
            <Image
              src="/images/stethoscope.png"
              alt="Stethoscope"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div className="bg-image bg-image-blue-stethoscope">
            <Image
              src="/images/blue-stethoscope.png"
              alt="Blue Stethoscope"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
        {children}
      </body>
    </html>
  );
}
