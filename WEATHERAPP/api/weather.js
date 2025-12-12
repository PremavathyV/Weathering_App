export default async function handler(req, res) {
  const { city } = req.query;

  if (!city) {
    return res.status(400).json({ error: "City is required" });
  }

  try {
    const response = await fetch(`https://wttr.in/${city}?format=j1`);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch weather" });
  }
}
