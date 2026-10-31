const toggle=document.querySelector(".menu-toggle"),nav=document.querySelector(".nav-links");
if(toggle&&nav){toggle.addEventListener("click",()=>{const open=nav.classList.toggle("open");toggle.setAttribute("aria-expanded",String(open));});}
document.querySelectorAll("[data-year]").forEach(el=>el.textContent=new Date().getFullYear());
const form=document.querySelector("[data-contact-form]");
if(form){
 form.addEventListener("submit",async(event)=>{
  event.preventDefault();
  const data=new FormData(form);
  const fields=["name","phone","email","projectType","budget","timeline","message"];
  const payload={};fields.forEach(key=>payload[key]=(data.get(key)||"").toString().trim());
  const endpoint=form.dataset.endpoint;
  const notice=document.querySelector("[data-form-notice]");
  if(!endpoint){
   const subject=encodeURIComponent("Yêu cầu tư vấn nội thất từ website T68");
   const body=encodeURIComponent(`Họ tên: ${payload.name}\nĐiện thoại: ${payload.phone}\nEmail: ${payload.email}\nLoại công trình: ${payload.projectType}\nNgân sách: ${payload.budget}\nThời gian: ${payload.timeline}\n\nNhu cầu:\n${payload.message}`);
   if(notice)notice.textContent="Đang mở ứng dụng email. Nếu không mở, bạn có thể gửi trực tiếp đến tructbchome@gmail.com.";
   window.location.href=`mailto:tructbchome@gmail.com?subject=${subject}&body=${body}`;
   return;
  }
  try{
   const response=await fetch(endpoint,{method:"POST",headers:{"Content-Type":"application/json","Accept":"application/json"},body:JSON.stringify(payload)});
   if(!response.ok)throw new Error("Gửi biểu mẫu chưa thành công.");
   form.reset();if(notice)notice.textContent="Cảm ơn bạn. Yêu cầu đã được gửi thành công.";
  }catch(error){if(notice)notice.textContent="Chưa gửi được yêu cầu. Vui lòng gọi 0911 870 879 hoặc email tructbchome@gmail.com.";}
 });
}
