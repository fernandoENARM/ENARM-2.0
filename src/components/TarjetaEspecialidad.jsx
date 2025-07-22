const { motion } = window.framerMotion || {};

function TarjetaEspecialidad({ icon: Icon, label, onClick }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className="border border-blue-500 rounded-xl p-4 bg-gradient-to-br from-white via-gray-50 to-gray-100 shadow-md hover:shadow-lg dark:from-gray-700 dark:via-gray-800 dark:to-gray-900 dark:border-blue-400 flex flex-col items-center"
    >
      <Icon className="w-8 h-8 text-blue-500 dark:text-blue-400" />
      <span className="mt-2 font-medium text-center">{label}</span>
    </motion.button>
  );
}

window.TarjetaEspecialidad = TarjetaEspecialidad;
