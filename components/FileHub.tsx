'use client';

import { motion } from 'framer-motion';
import { mockFiles } from '@/lib/mockData';
import { FileText, Image, Video, File, Download } from 'lucide-react';

const categoryIcons = {
  document: FileText,
  image: Image,
  video: Video,
  other: File,
};

const categoryColors = {
  document: 'text-electric-blue',
  image: 'text-emerald-green',
  video: 'text-deep-purple',
  other: 'text-white/60',
};

export default function FileHub() {
  const groupedFiles = mockFiles.reduce((acc, file) => {
    if (!acc[file.category]) {
      acc[file.category] = [];
    }
    acc[file.category].push(file);
    return acc;
  }, {} as Record<string, typeof mockFiles>);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="glass rounded-2xl p-6 mb-6"
    >
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <FileText className="w-5 h-5 text-gradient" />
        <span className="text-gradient">File Hub</span>
      </h2>
      
      <div className="space-y-4">
        {Object.entries(groupedFiles).map(([category, files], categoryIndex) => {
          const IconComponent = categoryIcons[category as keyof typeof categoryIcons];
          return (
            <div key={category}>
              <h3 className="text-sm font-semibold mb-2 text-white/80 capitalize">{category}</h3>
              <div className="space-y-2">
                {files.map((file, index) => (
                  <motion.div
                    key={file.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 + categoryIndex * 0.1 + index * 0.05 }}
                    className="glass rounded-xl p-3 glass-hover cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <IconComponent className={`w-5 h-5 ${categoryColors[category as keyof typeof categoryColors]}`} />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm truncate">{file.name}</h3>
                        <div className="flex items-center gap-2 text-xs text-white/60">
                          <span>{file.size}</span>
                          <span>•</span>
                          <span>
                            {new Date(file.modified).toLocaleDateString('de-DE', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </span>
                        </div>
                      </div>
                      <Download className="w-4 h-4 text-white/40 group-hover:text-electric-blue transition-colors" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
