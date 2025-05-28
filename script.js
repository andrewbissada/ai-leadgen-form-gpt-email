document.getElementById("leadForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const business = document.getElementById("business").value;
  const service = document.getElementById("service").value;

  const prompt = `Write a short, professional response to a potential client named ${name}, from a ${business} business, who needs help with: ${service}`;

  console.log("About to call OpenAI API");

  const response = await fetch("/api/openai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }]
    })
  })
    .catch(error => {
      console.error("Fetch failed:", error);
      return null; // This prevents the undefined error
    });

  // ADD THIS CHECK HERE (before your existing code)
  if (!response || !response.ok) {
    console.error("API call failed");
    return;
  }

  const data = await response.json();
  const message = data.choices[0].message.content;

  alert("Generated email:\n\n" + message);

  // SEND EMAIL via FormSubmit
  await fetch("https://formsubmit.co/andrew.bissada@gmail.com", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: JSON.stringify({
      name: name,
      email: email,
      message: message  // this is the GPT-generated email body
    })
  });

});
