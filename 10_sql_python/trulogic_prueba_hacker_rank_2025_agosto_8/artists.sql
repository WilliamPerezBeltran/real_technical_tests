CREATE TABLE artists (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL);

INSERT INTO artists (name) VALUES ('Vetusta Morla');
INSERT INTO artists (name) VALUES ('Leiva');
INSERT INTO artists (name) VALUES ('Love of Lesbian');
INSERT INTO artists (name) VALUES ('Andrés Suárez');
INSERT INTO artists (name) VALUES ('Rozalén');
INSERT INTO artists (name) VALUES ('Xoel López');
INSERT INTO artists (name) VALUES ('Sidecars');
INSERT INTO artists (name) VALUES ('Lori Meyers');
INSERT INTO artists (name) VALUES ('Depedro');
INSERT INTO artists (name) VALUES ('Zahara');




SELECT 
    i.invoice_number,
    c.customer_name,
    COUNT(ct.id) AS invoices_count
FROM invoice i
JOIN customer c 
    ON i.customer_id = c.id
LEFT JOIN contact ct 
    ON ct.customer_id = c.id
    AND ct.contact_start_time < i.time_issued
WHERE NOT EXISTS (
    SELECT 1
    FROM contact c2
    WHERE c2.customer_id = i.customer_id
      AND c2.user_account_id = i.user_account_id
)
GROUP BY i.invoice_number, c.customer_name
ORDER BY i.invoice_number ASC;