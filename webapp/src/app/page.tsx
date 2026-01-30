export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-slate-100">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-16 px-6 py-24">
        <section className="rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-lg">
          <p className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-sm font-medium text-emerald-200">
            Новый взгляд на уют сервера
          </p>
          <h1 className="mt-5 text-4xl font-semibold leading-tight sm:text-5xl">
            AgenticHelper — плагин, который встречает игроков и дарит бонусы
          </h1>
          <p className="mt-5 max-w-3xl text-lg text-slate-200/80">
            Добавьте на Paper или Spigot сервер теплое приветствие и ежедневные подарки командой{" "}
            <code className="rounded bg-white/10 px-2 py-1 text-sm">/agentgift</code>. Никаких сложных настроек — все готово из коробки.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="/downloads/AgenticHelper.jar"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-400 px-6 py-3 text-base font-semibold text-slate-900 transition hover:bg-emerald-300"
            >
              Скачать готовый Jar
              <span aria-hidden>↗</span>
            </a>
            <a
              href="#source"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 text-base font-semibold text-white/90 transition hover:border-white hover:text-white"
            >
              Исходный код
            </a>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          {[
            {
              title: "Приветствие на входе",
              description:
                "Плагин автоматически подменяет join-сообщение и отправляет личное приветствие с указанием имени игрока.",
            },
            {
              title: "Ежедневные подарки",
              description:
                "Команда /agentgift доступна каждому. Награда меняется и учитывает, получал ли игрок бонус сегодня.",
            },
            {
              title: "Безопасное хранение",
              description:
                "Информация о получении бонуса хранится в PersistentDataContainer, поэтому переживет рестарты сервера.",
            },
            {
              title: "Легкая конфигурация",
              description:
                "Файл config.yml создается сам. Используйте %player% для вставки имени и меняйте стиль с помощью цветовых кодов.",
            },
          ].map((card) => (
            <article
              key={card.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/10"
            >
              <h2 className="text-xl font-semibold">{card.title}</h2>
              <p className="mt-3 text-sm text-slate-200/80">{card.description}</p>
            </article>
          ))}
        </section>

        <section className="grid gap-8 lg:grid-cols-[2fr,3fr]">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h3 className="text-2xl font-semibold">Запуск на сервере</h3>
            <ol className="mt-5 space-y-4 text-sm text-slate-200/80">
              <li className="rounded-xl border border-white/5 bg-black/20 p-4">
                1. Скопируйте <code className="rounded bg-white/10 px-2 py-1">AgenticHelper.jar</code> в папку{" "}
                <code className="rounded bg-white/10 px-2 py-1">plugins</code>.
              </li>
              <li className="rounded-xl border border-white/5 bg-black/20 p-4">
                2. Перезапустите сервер или выполните <code className="rounded bg-white/10 px-2 py-1">/reload confirm</code>.
              </li>
              <li className="rounded-xl border border-white/5 bg-black/20 p-4">
                3. Проверьте приветствие и протестируйте команду <code className="rounded bg-white/10 px-2 py-1">/agentgift</code>.
              </li>
            </ol>
            <p className="mt-5 text-xs text-slate-400">
              Совместимо с Paper и Spigot 1.20+. Для старших версий пересоберите плагин с подходящей версией API.
            </p>
          </div>

          <div className="rounded-3xl border border-emerald-400/40 bg-emerald-400/10 p-8">
            <h3 className="text-2xl font-semibold text-emerald-100">Настройка приветствия</h3>
            <p className="mt-3 text-sm text-emerald-50/80">
              Пример содержимого <code className="rounded bg-white/10 px-2 py-1">config.yml</code>:
            </p>
            <pre className="mt-4 overflow-auto rounded-2xl bg-black/70 p-5 text-sm leading-relaxed text-emerald-100">
{`messages:
  welcome: "&bПривет, &f%player%&b! Используй &e/agentgift &bчтобы получить подарок дня."`}
            </pre>
            <p className="mt-4 text-xs text-emerald-50/70">
              Используйте стандартные цветовые коды Minecraft (&a, &b, &6 и др.). Плейсхолдер %player% заменяется на имя игрока.
            </p>
          </div>
        </section>

        <section id="source" className="rounded-3xl border border-white/10 bg-white/5 p-8">
          <h3 className="text-2xl font-semibold">Для разработчиков</h3>
          <div className="mt-4 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-white/5 bg-black/30 p-6">
              <h4 className="text-lg font-semibold text-white">Команда подарков</h4>
              <p className="mt-3 text-sm text-slate-200/80">
                Реализована на чистом Bukkit API: проверяет права, фиксирует дату выдачи и выдает награды с учетом типа.
              </p>
              <pre className="mt-4 h-48 overflow-auto rounded-xl bg-black/80 p-4 text-xs text-slate-200">
{`PersistentDataContainer data = player.getPersistentDataContainer();
long today = LocalDate.now(zone).toEpochDay();
if (today == lastClaim) return; // защита от повтора

ItemStack reward = new ItemStack(material, amount);
player.getInventory().addItem(reward);
data.set(key, PersistentDataType.LONG, today);`}
              </pre>
            </div>
            <div className="rounded-2xl border border-white/5 bg-black/30 p-6">
              <h4 className="text-lg font-semibold text-white">Сборка из исходников</h4>
              <p className="mt-3 text-sm text-slate-200/80">
                В корне проекта есть скрипт <code className="rounded bg-white/10 px-2 py-1">build.sh</code>,
                который скачивает Spigot API и собирает JAR без Gradle и Maven.
              </p>
              <pre className="mt-4 overflow-auto rounded-xl bg-black/80 p-4 text-xs text-slate-200">
{`cd minecraft-plugin
./build.sh
ls build/AgenticHelper.jar`}
              </pre>
              <p className="mt-4 text-xs text-slate-400">
                При необходимости замените версию API в скрипте на ту, которая соответствует вашему серверу.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
