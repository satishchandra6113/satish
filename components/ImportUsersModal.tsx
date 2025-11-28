import { X, Upload, FileText, CheckCircle, AlertCircle, Download, FileCheck } from 'lucide-react';
import { useState, useRef } from 'react';
import { Button } from './Button';

interface ImportUsersModalProps {
  onClose: () => void;
}

export function ImportUsersModal({ onClose }: ImportUsersModalProps) {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    setFile(file);
    // Simulate upload
    setUploadStatus('uploading');
    setTimeout(() => {
      setUploadStatus('success');
    }, 2000);
  };

  const handleDownloadTemplate = () => {
    const csvContent = "data:text/csv;charset=utf-8,Name,Email,Role,Status\nJohn Doe,john@example.com,Sales,Active";
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "user_import_template.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-[#0F0F0F] to-[#0A0A0A] rounded-lg w-full max-w-xl shadow-2xl overflow-hidden border border-[#1A1A1A]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1A1A1A] bg-gradient-to-r from-[#0F0F0F] to-[#0A0A0A]">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center text-[#00FF66] border border-[#00FF66]/20">
              <Upload size={20} />
            </div>
            <div>
              <div className="text-xs text-[#00FF66] font-medium uppercase tracking-wide">Users /</div>
              <h2 className="text-xl font-normal text-[#D5FFD6]">Import Users</h2>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-[#D5FFD6] transition-colors p-2 hover:bg-[#1A1A1A] rounded-lg">
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          {/* Step 1: Download Template */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-[rgba(0,255,102,0.1)] border border-[#00FF66] flex items-center justify-center flex-shrink-0">
                <span className="text-[#00FF66] font-bold text-sm">1</span>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#D5FFD6]">Download Template</h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  Download the CSV template to ensure your data is formatted correctly.
                </p>
              </div>
            </div>
            <div className="ml-11">
              <button
                onClick={handleDownloadTemplate}
                className="flex items-center gap-2 px-3 py-2 bg-[#1A1A1A] hover:bg-[#2A2A2A] border border-[#333] hover:border-[#00FF66]/50 rounded-lg transition-all group"
              >
                <div className="p-2 rounded-lg bg-[rgba(0,255,102,0.1)] border border-[#00FF66]/20 group-hover:bg-[rgba(0,255,102,0.15)] transition-colors">
                  <Download className="text-[#00FF66]" size={18} />
                </div>
                <div className="flex-1 text-left">
                  <div className="text-sm font-medium text-[#D5FFD6]">Download CSV Template</div>
                  <div className="text-xs text-gray-400">user_import_template.csv</div>
                </div>
                <FileText className="text-gray-400 group-hover:text-[#00FF66] transition-colors" size={18} />
              </button>
            </div>
          </div>

          {/* Step 2: Upload File */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-[rgba(0,255,102,0.1)] border border-[#00FF66] flex items-center justify-center flex-shrink-0">
                <span className="text-[#00FF66] font-bold text-sm">2</span>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#D5FFD6]">Upload File</h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  Upload your filled CSV file here.
                </p>
              </div>
            </div>
            <div className="ml-11">
              <div
                className={`border-2 border-dashed rounded-lg p-6 text-center transition-all cursor-pointer ${
                  dragActive 
                    ? 'border-[#00FF66] bg-[rgba(0,255,102,0.05)] shadow-lg shadow-[#00FF66]/10' 
                    : 'border-[#333] hover:border-[#00FF66]/50 bg-[#1A1A1A]/30'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={!file ? triggerFileInput : undefined}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept=".csv"
                  onChange={handleChange}
                />

                {file ? (
                  <div className="flex flex-col items-center">
                    {uploadStatus === 'uploading' && (
                      <div className="relative mb-3">
                        <div className="animate-spin rounded-full h-10 w-10 border-2 border-[#00FF66]/30 border-t-[#00FF66]"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Upload className="text-[#00FF66]" size={20} />
                        </div>
                      </div>
                    )}
                    {uploadStatus === 'success' && (
                      <div className="mb-3 relative">
                        <div className="w-12 h-12 rounded-full bg-[rgba(0,255,102,0.1)] border-2 border-[#00FF66] flex items-center justify-center">
                          <CheckCircle className="text-[#00FF66]" size={24} />
                        </div>
                        <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#00FF66] flex items-center justify-center border-2 border-[#0F0F0F]">
                          <FileCheck className="text-[#0F0F0F]" size={14} />
                        </div>
                      </div>
                    )}
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="text-[#00FF66]" size={20} />
                      <span className="text-sm font-semibold text-[#D5FFD6]">{file.name}</span>
                    </div>
                    <span className="text-xs text-gray-400 mb-3">
                      {uploadStatus === 'uploading' ? 'Uploading...' : uploadStatus === 'success' ? 'Upload Complete' : 'Ready to upload'}
                    </span>
                    {uploadStatus === 'success' && (
                      <button
                        onClick={(e) => { e.stopPropagation(); setFile(null); setUploadStatus('idle'); }}
                        className="text-xs text-[#00FF66] hover:text-[#00CC52] font-medium transition-colors flex items-center gap-1"
                      >
                        <Upload size={14} />
                        Upload another file
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-[rgba(0,255,102,0.1)] border-2 border-[#00FF66]/30 flex items-center justify-center mb-3">
                      <Upload className="text-[#00FF66]" size={24} />
                    </div>
                    <p className="text-sm text-gray-400 mb-1">
                      Drag and drop your file here, or{' '}
                      <button onClick={(e) => { e.stopPropagation(); triggerFileInput(); }} className="text-[#00FF66] hover:text-[#00CC52] font-semibold underline underline-offset-2 transition-colors">
                        browse
                      </button>
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      Supports .csv files only
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Import Information */}
          <div className="bg-gradient-to-r from-[rgba(0,255,102,0.05)] to-[rgba(0,255,102,0.02)] border border-[#00FF66]/30 rounded-lg p-4 flex items-start gap-3 backdrop-blur-sm">
            <div className="p-2 rounded-lg bg-[rgba(0,255,102,0.1)] border border-[#00FF66]/40 flex-shrink-0">
              <AlertCircle className="text-[#00FF66]" size={20} />
            </div>
            <div className="flex-1">
              <p className="font-semibold mb-3 text-[#D5FFD6] text-sm">Import Information</p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-start gap-2">
                  <span className="text-[#00FF66] mt-1">•</span>
                  <span>Email addresses must be unique</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00FF66] mt-1">•</span>
                  <span>Roles must match existing roles in the system</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00FF66] mt-1">•</span>
                  <span>Large files may take a few minutes to process</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#1A1A1A] px-6 py-4 border-t border-[#1A1A1A] flex justify-end gap-3">
          <button 
            onClick={onClose} 
            className="px-4 py-2 rounded-lg text-gray-400 hover:text-[#D5FFD6] font-medium text-sm transition-colors"
          >
            Cancel
          </button>
          <Button
            variant="cybercyko"
            disabled={!file || uploadStatus !== 'success'}
            onClick={onClose}
            className="disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Import Users
          </Button>
        </div>
      </div>
    </div>
  );
}
