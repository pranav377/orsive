import { motion } from "framer-motion";
import { NextSeo } from "next-seo";

type LayoutProps = {
  children: React.ReactNode;
  title?: string;
};

const Layout = ({ children, title }: LayoutProps) => (
  <>
    {title && (
      <NextSeo
        title={title}
        openGraph={{
          title,
        }}
      />
    )}
    <motion.main
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={{
        hidden: { opacity: 0, x: -200, y: 0 },
        enter: { opacity: 1, x: 0, y: 0 },
        exit: { opacity: 0, x: -200, y: 0 },
      }}
      className="overflow-x-hidden"
      transition={{ type: "linear" }}
    >
      <div className="mb-24">{children}</div>
    </motion.main>
  </>
);

export { Layout };
