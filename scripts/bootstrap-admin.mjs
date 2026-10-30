#!/usr/bin/env node
/**
 * Cria (ou promove) o PRIMEIRO administrador da TV Gazeta News.
 *
 * Procedimento seguro — roda SOMENTE no seu computador/servidor, nunca no
 * frontend. Usa a SERVICE_ROLE (que ignora RLS) apenas localmente.
 *
 * Uso (Node 20.6+; aqui temos Node 24):
 *   node --env-file=.env.local scripts/bootstrap-admin.mjs [email]
 *
 * - O e-mail pode ser passado como argumento OU digitado quando solicitado.
 * - A SENHA é sempre digitada de forma OCULTA (sem eco na tela e sem ficar no
 *   histórico do terminal), com confirmação. Só é pedida ao criar um usuário novo.
 * - Se o usuário já existir, apenas o promove a admin (não pede senha).
 *
 * Requer em .env.local:
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY   (NUNCA commitar / NUNCA expor ao cliente)
 */
import readline from "node:readline";
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

function fail(msg) {
  console.error(`\n✖ ${msg}\n`);
  process.exit(1);
}

/** Pergunta visível (ex.: e-mail). */
function ask(query) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) =>
    rl.question(query, (answer) => {
      rl.close();
      resolve(answer.trim());
    }),
  );
}

/** Pergunta OCULTA: escreve o prompt, mas suprime o eco do que é digitado. */
function askHidden(query) {
  return new Promise((resolve) => {
    process.stdout.write(query);
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: true });
    // Suprime a renderização dos caracteres digitados (sem eco, sem asteriscos).
    rl._writeToOutput = () => {};
    rl.question("", (answer) => {
      rl.close();
      process.stdout.write("\n");
      resolve(answer);
    });
  });
}

if (!url || !serviceRoleKey) {
  fail(
    "Defina NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY em .env.local e rode com: node --env-file=.env.local scripts/bootstrap-admin.mjs [email]",
  );
}

const supabase = createClient(url, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

async function findUserByEmail(targetEmail) {
  // Paginação defensiva (sem endpoint direto por e-mail em todas as versões).
  for (let page = 1; page <= 20; page++) {
    const { data, error } = await supabase.auth.admin.listUsers({ page, perPage: 200 });
    if (error) fail(`Erro ao listar usuários: ${error.message}`);
    const found = data.users.find(
      (u) => (u.email ?? "").toLowerCase() === targetEmail.toLowerCase(),
    );
    if (found) return found;
    if (data.users.length < 200) break;
  }
  return null;
}

async function readNewPassword() {
  const pwd = await askHidden("Senha do administrador (oculta): ");
  if (pwd.length < 8) fail("A senha deve ter ao menos 8 caracteres.");
  const confirm = await askHidden("Confirme a senha: ");
  if (pwd !== confirm) fail("As senhas não conferem.");
  return pwd;
}

async function main() {
  let email = (process.argv[2] ?? "").trim();
  if (!email) email = await ask("E-mail do administrador: ");
  if (!email || !email.includes("@")) fail("E-mail inválido.");

  let user = await findUserByEmail(email);

  if (!user) {
    const password = await readNewPassword();
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { display_name: email.split("@")[0] },
    });
    if (error) fail(`Erro ao criar usuário: ${error.message}`);
    user = data.user;
    console.log(`✓ Usuário criado: ${email}`);
  } else {
    console.log(`• Usuário já existe: ${email}`);
  }

  // Garante o perfil e promove a admin (service_role ignora RLS/trigger).
  const { error: upsertError } = await supabase
    .from("profiles")
    .upsert(
      { user_id: user.id, role: "admin", display_name: email.split("@")[0] },
      { onConflict: "user_id" },
    );
  if (upsertError) fail(`Erro ao promover a admin: ${upsertError.message}`);

  console.log(`✓ ${email} agora é ADMINISTRADOR.`);
  console.log("\nPronto. Faça login em /admin/login.\n");
}

main().catch((e) => fail(e?.message ?? String(e)));
