<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="java.util.*,java.io.*"%>
<%@ page import="com.oreilly.servlet.MultipartRequest"%>
<%@ page import="com.oreilly.servlet.multipart.*"%>
<%
	String encType = "UTF-8";
	int maxSize = 1024 * 1024 * 5;

	String saveFolder = "ImageFolder";//이미지 파일 저장폴더
	ServletContext context = getServletContext();
	String realFolder = context.getRealPath(saveFolder);
	File file = new File(realFolder);
	
	String name,filename,original,type,value;
	if(!file.exists())
		file.mkdir();
	try { 
		MultipartRequest multi = null;
		multi = new MultipartRequest(request, realFolder, maxSize,
				encType, new DefaultFileRenamePolicy());
		@SuppressWarnings("unchecked")
		Enumeration params = multi.getParameterNames();
						
		while (params.hasMoreElements()) {
			name = (String) params.nextElement();
			value = multi.getParameter(name);
		}
		
		@SuppressWarnings("unchecked")
		Enumeration files = multi.getFileNames();
		
		//
		File newFile = multi.getFile("uploadImg");
		//newFile.renameTo(new File(java.net.URLEncoder.encode(multi.getOriginalFileName("uploadImg"))));
		String newName = java.net.URLEncoder.encode(multi.getFilesystemName("uploadImg"),"UTF-8");
		newFile.renameTo(new File("/"+realFolder+"/"+newName));
		//파일에 새이름을 지정하는 부분입니다.

		while (files.hasMoreElements()) {
			//이 부분은 저장된 이후에 만들어지는 내용입니다.
			name = (String) files.nextElement();
			filename = multi.getFilesystemName(name);
			original = multi.getOriginalFileName(name);
			type = multi.getContentType(name);
			file = multi.getFile(name);
			
			if(original !=null || filename != null){
				//String path = new String("/"+saveFolder+"/"+filename);
				String path = new String("/"+saveFolder+"/"+newName);
				//새이름을 가진 경로를 리턴합니다.
				request.setAttribute("i_path",path);
				request.setAttribute("i_original",original);
				request.setAttribute("i_type",type);
				request.setAttribute("i_size",file.length());
%>				
				<jsp:forward page="image.jsp"/>
<%	
				
			}
		}		
	} catch (Exception e) {
		System.out.println(e);
	} finally {

	}
%>
