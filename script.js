document.getElementById("leadForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const business = document.getElementById("business").value;
  const service = document.getElementById("service").value;

  const prompt = `Write a short, professional response to a potential client named ${name}, from a ${business} business, who needs help with: ${service}`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer YOUR_API_KEY_HERE"
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }]
    })
  });

  const data = await response.json();
  const message = data.choices[0].message.content;

  alert("Generated email:\n\n" + message);

  // SEND EMAIL via FormSubmit
  await fetch("https://formsubmit.co/andrew.bissada@gmail.com", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: name,
      email: email,
      message: message  // this is the GPT-generated email body
    })
  });

});
