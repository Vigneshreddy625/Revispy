import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import axios from "axios";

const ProductFormModal = ({ isOpen, onClose }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    originalPrice: "",
    newArrival: false,
    isBestSeller: false,
    rating: 0,
    reviews: 0,
    stockStatus: "In Stock",
    stockQuantity: 0,
    category: "",
    brand: "",
    sizes: [],
    features: [],
    shipping: "",
    returns: "",
  });

  const [colors, setColors] = useState([{ name: "", value: "", hex: "" }]);
  const [sizes, setSizes] = useState([""]);
  const [features, setFeatures] = useState([""]);
  const [thumbnail, setThumbnail] = useState(null);
  const [gallery, setGallery] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const updateArray = (index, value, array, setArray) => {
    const updated = [...array];
    updated[index] = value;
    setArray(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(form).forEach((key) => formData.append(key, form[key]));
    formData.append("colors", JSON.stringify(colors));
    formData.append("sizes", JSON.stringify(sizes));
    formData.append("features", JSON.stringify(features));
    if (thumbnail) formData.append("image", thumbnail);
    gallery.forEach((file) => formData.append("images", file));

    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/products/create",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log("Product created:", res.data);
      onClose(); // close modal after success
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-screen md:max-h-[90vh] overflow-y-scroll max-w-3xl shadow-xl border border-muted">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col lg:grid lg:grid-cols-2 gap-4"
        >
          <Input
            name="title"
            placeholder="Product Title"
            value={form.title}
            onChange={handleChange}
            required
          />
          <Input
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
          />

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="col-span-2 w-full rounded-md border px-3 py-2"
          />

          <Input
            name="price"
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            required
          />
          <Input
            name="originalPrice"
            type="number"
            placeholder="Original Price"
            value={form.originalPrice}
            onChange={handleChange}
            required
          />

          <Input
            name="brand"
            placeholder="Brand"
            value={form.brand}
            onChange={handleChange}
          />
          <Input
            name="stockQuantity"
            type="number"
            placeholder="Stock Quantity"
            value={form.stockQuantity}
            onChange={handleChange}
          />

          <Input
            name="rating"
            type="number"
            placeholder="Rating (0–5)"
            value={form.rating}
            onChange={handleChange}
          />
          <Input
            name="reviews"
            type="number"
            placeholder="Reviews"
            value={form.reviews}
            onChange={handleChange}
          />

          <Select
            value={form.stockStatus}
            onValueChange={(val) => setForm({ ...form, stockStatus: val })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Stock Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="In Stock">In Stock</SelectItem>
              <SelectItem value="Out of Stock">Out of Stock</SelectItem>
              <SelectItem value="Limited Stock">Limited Stock</SelectItem>
            </SelectContent>
          </Select>

          <Input
            name="shipping"
            placeholder="Shipping Info"
            value={form.shipping}
            onChange={handleChange}
          />
          <Input
            name="returns"
            placeholder="Return Policy"
            value={form.returns}
            onChange={handleChange}
          />

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <Checkbox
                checked={form.newArrival}
                onCheckedChange={(val) => setForm({ ...form, newArrival: val })}
              />
              New Arrival
            </label>
            <label className="flex items-center gap-2">
              <Checkbox
                checked={form.isBestSeller}
                onCheckedChange={(val) =>
                  setForm({ ...form, isBestSeller: val })
                }
              />
              Best Seller
            </label>
          </div>

          <div className="col-span-2">
            <label className="font-medium">Thumbnail Image</label>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setThumbnail(e.target.files[0])}
            />
          </div>

          <div className="col-span-2">
            <label className="font-medium">Gallery Images</label>
            <Input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => setGallery([...e.target.files])}
            />
          </div>

          <div className="col-span-2">
            <label className="font-medium">Colors</label>
            {colors.map((c, i) => (
              <div key={i} className="flex gap-2 mt-1">
                <Input
                  placeholder="Name"
                  value={c.name}
                  onChange={(e) => {
                    const updated = [...colors];
                    updated[i].name = e.target.value;
                    setColors(updated);
                  }}
                />
                <Input
                  placeholder="Value"
                  value={c.value}
                  onChange={(e) => {
                    const updated = [...colors];
                    updated[i].value = e.target.value;
                    setColors(updated);
                  }}
                />
                <Input
                  type="color"
                  value={c.hex}
                  onChange={(e) => {
                    const updated = [...colors];
                    updated[i].hex = e.target.value;
                    setColors(updated);
                  }}
                />
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              className="mt-2"
              onClick={() =>
                setColors([...colors, { name: "", value: "", hex: "#000000" }])
              }
            >
              + Add Color
            </Button>
          </div>

          <div>
            <label className="font-medium">Sizes</label>
            {sizes.map((s, i) => (
              <Input
                key={i}
                value={s}
                onChange={(e) =>
                  updateArray(i, e.target.value, sizes, setSizes)
                }
                className="mt-1"
              />
            ))}
            <Button
              type="button"
              variant="outline"
              className="mt-2"
              onClick={() => setSizes([...sizes, ""])}
            >
              + Add Size
            </Button>
          </div>

          <div>
            <label className="font-medium">Features</label>
            {features.map((f, i) => (
              <Input
                key={i}
                value={f}
                onChange={(e) =>
                  updateArray(i, e.target.value, features, setFeatures)
                }
                className="mt-1"
              />
            ))}
            <Button
              type="button"
              variant="outline"
              className="mt-2"
              onClick={() => setFeatures([...features, ""])}
            >
              + Add Feature
            </Button>
          </div>

          <DialogFooter className="col-span-2">
            <Button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white w-full"
            >
              Submit Product
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductFormModal;
