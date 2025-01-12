import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Table from "../../components/Table";

const Banjir = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [form, setForm] = useState({ location: "", severity: "", description: "", date: "" });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentId, setCurrentId] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditMode) {
                // Update existing report
                const response = await axios.put(
                    `http://localhost:5000/api/flood/${currentId}`,
                    form,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
                            "Content-Type": "application/json",
                        },
                    }
                );
                setData(data.map(item => (item._id === currentId ? response.data : item)));
                Swal.fire({
                    icon: "success",
                    title: "Edit Berhasil",
                    text: "Data banjir berhasil diperbarui.",
                });
            } else {
                // Create new report
                const response = await axios.post(
                    "http://localhost:5000/api/flood",
                    form,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
                            "Content-Type": "application/json",
                        },
                    }
                );
                setData([...data, response.data]);
                Swal.fire({
                    icon: "success",
                    title: "Tambah Berhasil",
                    text: "Data banjir berhasil ditambahkan.",
                });
            }
            setForm({ location: "", severity: "", description: "", date: "" });
            setIsModalOpen(false);
            setIsEditMode(false);
            setCurrentId(null);
        } catch (error) {
            setError("Error saat submit");
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/flood/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
                },
            });
            setData(data.filter(item => item._id !== id));
            Swal.fire({
                icon: "success",
                title: "Hapus Berhasil",
                text: "Data banjir berhasil dihapus.",
            });
        } catch (error) {
            setError("Error saat menghapus data");
        }
    };

    const handleEdit = (item) => {
        setForm({ location: item.location, severity: item.severity, description: item.description, date: item.date });
        setIsEditMode(true);
        setCurrentId(item._id);
        setIsModalOpen(true);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/flood");
                setData(response.data);
            } catch (error) {
                setError("Error saat fetch data");
            }
        };
        fetchData();
    }, []);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Daftar Laporan Banjir</h1>
                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Tambah
                    </button>
                </div>
            </div>

            {error && <p className="text-red-500">{error}</p>}
            <div className="bg-white shadow-lg rounded-lg">
                <div className="p-6">
                    <Table data={data} handleEdit={handleEdit} handleDelete={handleDelete} />
                </div>
            </div>

            <div className="mt-8 bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Informasi</h2>
                <p className="text-gray-600">
                    Halaman ini menampilkan daftar laporan banjir yang tersedia. Anda dapat
                    menambah, mengedit, atau menghapus data laporan banjir. Data akan diperbarui
                    secara otomatis setelah setiap perubahan.
                </p>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h3 className="text-xl font-bold mb-4">{isEditMode ? "Edit Data" : "Tambah Data"}</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label
                                    htmlFor="location"
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                >
                                    Location:
                                </label>
                                <input
                                    type="text"
                                    name="location"
                                    value={form.location}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded-lg"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="severity"
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                >
                                    Severity:
                                </label>
                                <input
                                    type="text"
                                    name="severity"
                                    value={form.severity}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded-lg"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="description"
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                >
                                    Description:
                                </label>
                                <textarea
                                    name="description"
                                    value={form.description}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded-lg"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="date"
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                >
                                    Date:
                                </label>
                                <input
                                    type="date"
                                    name="date"
                                    value={form.date}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded-lg"
                                    required
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsModalOpen(false);
                                        setIsEditMode(false);
                                        setCurrentId(null);
                                        setForm({ location: "", severity: "", description: "", date: "" });
                                    }}
                                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Banjir;