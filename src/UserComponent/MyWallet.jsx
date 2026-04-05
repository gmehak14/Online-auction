// FILE: MyWallet.jsx - Customer ka wallet page
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const MyWallet = () => {
  const customer = JSON.parse(sessionStorage.getItem("active-customer"));
  const token = sessionStorage.getItem("customer-jwtToken");

  const [wallet, setWallet] = useState(customer?.walletAmount || 0);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!customer) { window.location.href = "/user/login"; return; }
    fetchWallet();
  }, []);

  const fetchWallet = () => {
    axios.get(`http://localhost:8080/api/user/${customer.id}`)
      .then(res => {
        if (res.data.success) {
          setWallet(res.data.user.walletAmount);
          const updated = { ...customer, walletAmount: res.data.user.walletAmount };
          sessionStorage.setItem("active-customer", JSON.stringify(updated));
        }
      })
      .catch(() => {});
  };

  const addMoney = () => {
    const amt = parseFloat(amount);
    if (!amt || amt <= 0) { toast.error("Valid amount daalo!"); return; }
    if (amt > 100000) { toast.error("Maximum ₹1,00,000 ek baar mein"); return; }

    setLoading(true);
    axios.put("http://localhost:8080/api/user/wallet/add", { userId: customer.id, amount: amt })
      .then(res => {
        if (res.data.success) {
          toast.success(`₹${amt} wallet mein add ho gaye! 💰`);
          setAmount("");
          setWallet(res.data.newBalance);
          const updated = { ...customer, walletAmount: res.data.newBalance };
          sessionStorage.setItem("active-customer", JSON.stringify(updated));
        } else {
          toast.error(res.data.message);
        }
      })
      .catch(() => toast.error("Error aaya, dobara try karo"))
      .finally(() => setLoading(false));
  };

  const quickAmounts = [500, 1000, 2000, 5000];

  if (!customer) return null;

  return (
    <div className="container mt-5 mb-5">
      <div className="text-center mb-4">
        <h2 style={{ color: "#6f42c1" }}>💰 Mera Wallet</h2>
        <p className="text-muted">Balance dekho aur recharge karo</p>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-6">

          {/* Balance Card */}
          <div className="card shadow mb-4 text-center"
            style={{ background: "linear-gradient(135deg, #6f42c1, #9b59b6)", color: "white" }}>
            <div className="card-body p-4">
              <p className="mb-1 opacity-75">Current Balance</p>
              <h1 className="display-4 fw-bold">₹{wallet.toFixed(2)}</h1>
              <small className="opacity-75">Hello, {customer.firstName}!</small>
            </div>
          </div>

          {/* Add Money Card */}
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <h5 className="mb-3">💳 Paise Add Karo</h5>

              <p className="text-muted small mb-2">Quick Select:</p>
              <div className="d-flex gap-2 mb-3 flex-wrap">
                {quickAmounts.map(q => (
                  <button key={q} className="btn btn-outline-primary btn-sm"
                    onClick={() => setAmount(q.toString())}>
                    ₹{q}
                  </button>
                ))}
              </div>

              <div className="mb-3">
                <label className="form-label">Ya apna amount type karo</label>
                <div className="input-group">
                  <span className="input-group-text">₹</span>
                  <input type="number" className="form-control" placeholder="0.00"
                    value={amount} onChange={e => setAmount(e.target.value)} min="1" max="100000" />
                </div>
              </div>

              <button className="btn btn-primary w-100 py-2" onClick={addMoney}
                disabled={loading || !amount}>
                {loading ? "Adding..." : `💰 Add ₹${amount || "0"} to Wallet`}
              </button>

              <p className="text-muted small text-center mt-2">
                * Demo project — real payment nahi hoga
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
export default MyWallet;
