const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className=" py-6 bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
          © {currentYear} Kudos Board. All rights reserved.
        </div>
    </footer>
  );
};

export default Footer;
