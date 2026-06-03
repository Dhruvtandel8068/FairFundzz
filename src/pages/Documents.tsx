import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../api/axios";
import {
  FolderOpen,
  Upload,
  Download,
  Trash2,
  FileText,
  Loader2,
} from "lucide-react";

type Worker = {
  _id: string;
  name: string;
  role: string;
};

type WorkerDocument = {
  _id: string;
  worker: Worker;
  documentType: string;
  fileName: string;
  fileMimeType: string;
  createdAt: string;
};

const Documents = () => {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [documents, setDocuments] = useState<WorkerDocument[]>([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    worker: "",
    documentType: "Aadhaar",
  });

  const [file, setFile] = useState<File | null>(null);

  const fetchWorkers = async () => {
    const res = await API.get("/workers");
    setWorkers(res.data.workers || []);
  };

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const res = await API.get("/documents");
      setDocuments(res.data.documents || []);
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to fetch documents");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkers();
    fetchDocuments();
  }, []);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.worker || !form.documentType || !file) {
      alert("Please select worker, document type and file");
      return;
    }

    const formData = new FormData();
    formData.append("worker", form.worker);
    formData.append("documentType", form.documentType);
    formData.append("document", file);

    try {
      await API.post("/documents", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setForm({
        worker: "",
        documentType: "Aadhaar",
      });

      setFile(null);

      const fileInput = document.getElementById(
        "document-file"
      ) as HTMLInputElement;

      if (fileInput) fileInput.value = "";

      fetchDocuments();
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to upload document");
    }
  };

  const downloadDocument = async (
    id: string,
    fileName: string
  ) => {
    try {
      const res = await API.get(`/documents/${id}/download`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");

      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to download document");
    }
  };

  const deleteDocument = async (id: string) => {
    const confirmDelete = confirm("Delete this document?");
    if (!confirmDelete) return;

    try {
      await API.delete(`/documents/${id}`);
      fetchDocuments();
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to delete document");
    }
  };

  return (
    <div className="flex bg-[#f4f7fe] min-h-screen">
      <Navbar />

      <div className="ml-[220px] w-[calc(100%-220px)] p-6">
        <div className="bg-white rounded-3xl shadow-sm p-6 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">
              Worker Documents
            </h1>
            <p className="text-gray-500 mt-2">
              Upload, download and manage worker HR documents.
            </p>
          </div>

          <div className="bg-blue-100 text-blue-700 px-5 py-3 rounded-2xl font-semibold flex items-center gap-2">
            <FolderOpen size={20} />
            Documents: {documents.length}
          </div>
        </div>

        <form
          onSubmit={handleUpload}
          className="bg-white rounded-3xl shadow-sm p-6 mt-8"
        >
          <h2 className="text-2xl font-bold mb-5">
            Upload New Document
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            <select
              value={form.worker}
              onChange={(e) =>
                setForm({ ...form, worker: e.target.value })
              }
              className="border rounded-xl px-4 py-3"
            >
              <option value="">Select Worker</option>

              {workers.map((worker) => (
                <option key={worker._id} value={worker._id}>
                  {worker.name} - {worker.role}
                </option>
              ))}
            </select>

            <select
              value={form.documentType}
              onChange={(e) =>
                setForm({
                  ...form,
                  documentType: e.target.value,
                })
              }
              className="border rounded-xl px-4 py-3"
            >
              <option value="Aadhaar">Aadhaar</option>
              <option value="PAN">PAN</option>
              <option value="Bank Passbook">Bank Passbook</option>
              <option value="Contract">Contract</option>
              <option value="Resume">Resume</option>
              <option value="Medical">Medical</option>
              <option value="Other">Other</option>
            </select>

            <input
              id="document-file"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) =>
                setFile(e.target.files ? e.target.files[0] : null)
              }
              className="border rounded-xl px-4 py-3"
            />

            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2">
              <Upload size={20} />
              Upload
            </button>
          </div>
        </form>

        <div className="bg-white rounded-3xl shadow-sm p-6 mt-8">
          <h2 className="text-2xl font-bold mb-6">
            Document Records
          </h2>

          {loading ? (
            <div className="flex justify-center p-10">
              <Loader2 className="animate-spin text-blue-600" size={36} />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="p-4 text-left">Worker</th>
                    <th className="p-4 text-left">Document Type</th>
                    <th className="p-4 text-left">File</th>
                    <th className="p-4 text-left">Uploaded Date</th>
                    <th className="p-4 text-left">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {documents.map((doc) => (
                    <tr key={doc._id} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <p className="font-semibold">
                          {doc.worker?.name || "Worker deleted"}
                        </p>
                        <p className="text-sm text-gray-500">
                          {doc.worker?.role || "-"}
                        </p>
                      </td>

                      <td className="p-4">{doc.documentType}</td>

                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <FileText size={18} />
                          {doc.fileName}
                        </div>
                      </td>

                      <td className="p-4">
                        {new Date(doc.createdAt).toLocaleDateString()}
                      </td>

                      <td className="p-4 flex gap-2">
                        <button
                          onClick={() =>
                            downloadDocument(doc._id, doc.fileName)
                          }
                          className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-2 rounded-lg flex items-center gap-2"
                        >
                          <Download size={18} />
                          Download
                        </button>

                        <button
                          onClick={() => deleteDocument(doc._id)}
                          className="bg-red-100 hover:bg-red-200 text-red-600 p-2 rounded-lg"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}

                  {documents.length === 0 && (
                    <tr>
                      <td
                        colSpan={5}
                        className="p-6 text-center text-gray-500"
                      >
                        No documents uploaded yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Documents;