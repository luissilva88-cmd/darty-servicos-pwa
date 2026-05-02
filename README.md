# Darty Serviços PWA

MVP de web app instalável para Android, com estilo inspirado na Darty.

## Funcionalidades incluídas

- PWA com manifest e ícones
- Login de teste por perfil: Cliente, Técnico e Admin
- Cliente agenda serviços e acompanha pedidos
- Técnico aceita pedidos e atualiza estado
- Admin atribui técnicos e vê receita prevista
- Dados guardados em localStorage

## Como testar localmente

```bash
npm install
npm run dev
```

Abrir: http://localhost:3000

## Como publicar online na Vercel

1. Criar conta em https://vercel.com
2. Criar novo projeto
3. Fazer upload/import deste projeto
4. Deploy
5. Abrir o link HTTPS no Chrome Android
6. Menu ⋮ > Adicionar ao ecrã inicial

## Próximo passo para app real

Substituir localStorage por Supabase ou Firebase:

- Autenticação real
- Base de dados de clientes/técnicos/pedidos
- Upload de fotos
- Notificações push
- Pagamentos
- Painel de administração avançado
