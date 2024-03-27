Autenticacion (Instalar aws cli - configurar aws con keys de admin):

  WINDOWS: (Get-ECRLoginCommand).Password | docker login --username AWS --password-stdin 851725493681.dkr.ecr.us-east-1.amazonaws.com
  
  LINUX: aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 851725493681.dkr.ecr.us-east-1.amazonaws.comaws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 851725493681.dkr.ecr.us-east-1.amazonaws.com